import { errorResponse, jsonResponse } from "../../utils";

interface SupabaseUploadResponse {
  id: string;
  path: string;
  fullPath: string;
}

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method !== "POST") {
    return errorResponse("Method not allowed", 405);
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const section = formData.get("section") as string | null;

    if (!file) {
      return errorResponse("No file provided", 400);
    }

    if (!section) {
      return errorResponse("Section parameter is required", 400);
    }

    // Validate file type (images and videos)
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
      "video/mp4",
      "video/webm",
    ];
    if (!allowedTypes.includes(file.type)) {
      return errorResponse(
        "Invalid file type. Only JPEG, PNG, WebP, MP4, and WebM are allowed",
        400,
      );
    }

    // Validate file size (5MB for images, 50MB for videos)
    const isVideo = file.type.startsWith("video/");
    const maxSize = isVideo ? 50 * 1024 * 1024 : 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return errorResponse(
        isVideo
          ? "File size exceeds 50MB limit"
          : "File size exceeds 5MB limit",
        400,
      );
    }

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return errorResponse("Supabase configuration missing", 500);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split(".").pop() || "jpg";
    const fileName = `${section}/${timestamp}.${fileExt}`;

    // Upload to Supabase Storage
    const uploadUrl = `${supabaseUrl}/storage/v1/object/advaitam-images/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": file.type,
        "x-upsert": "true",
      },
      body: arrayBuffer,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error("Supabase upload error:", errorText);
      return errorResponse("Failed to upload image", 500);
    }

    // Get public URL
    const publicUrl = `${supabaseUrl}/storage/v1/object/public/advaitam-images/${fileName}`;

    return jsonResponse({
      url: publicUrl,
      path: fileName,
      section,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return errorResponse("Internal server error", 500);
  }
}
