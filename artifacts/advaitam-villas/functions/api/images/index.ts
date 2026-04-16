import { errorResponse, jsonResponse } from "../../utils";

interface BucketFile {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
}

interface BucketFolder {
  name: string;
  id: string;
  updated_at: string;
  created_at: string;
  last_accessed_at: string;
  metadata: Record<string, any>;
}

interface ListResponse {
  data: (BucketFile | BucketFolder)[];
  error: null | { message: string };
}

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method !== "GET") {
    return errorResponse("Method not allowed", 405);
  }

  try {
    const url = new URL(request.url);
    const section = url.searchParams.get("section");

    const supabaseUrl = env.SUPABASE_URL;
    const supabaseKey = env.SUPABASE_SERVICE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return errorResponse("Supabase configuration missing", 500);
    }

    // List files from Supabase Storage
    const listUrl = `${supabaseUrl}/storage/v1/object/list/advaitam-images`;

    const listResponse = await fetch(listUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prefix: section ? `${section}/` : "",
        limit: 100,
        offset: 0,
      }),
    });

    if (!listResponse.ok) {
      const errorText = await listResponse.text();
      console.error("Supabase list error:", errorText);
      return errorResponse("Failed to list images", 500);
    }

    const result = await listResponse.json();

    // Handle both { data: [...], error: null } and direct array response formats
    const items = Array.isArray(result) ? result : result.data || [];

    if (result.error) {
      return errorResponse(result.error.message, 500);
    }

    // Filter to only include files (not folders) and map to useful format
    const images = items
      .filter((item: any) => {
        // Files have metadata with size, folders don't
        return item && item.metadata && typeof item.metadata.size === "number";
      })
      .map((file: any) => {
        // Supabase list may return just the filename without the section prefix
        // We need to construct the full path for the public URL
        const fullPath =
          section && !file.name.startsWith(`${section}/`)
            ? `${section}/${file.name}`
            : file.name;
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/advaitam-images/${fullPath}`;
        return {
          name: file.name,
          url: publicUrl,
          updatedAt: file.updated_at,
          size: file.metadata.size,
          contentType: file.metadata.mimetype || "image/jpeg",
        };
      })
      .sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );

    return jsonResponse({
      images,
      section,
      count: images.length,
    });
  } catch (error) {
    console.error("List images error:", error);
    return errorResponse("Internal server error", 500);
  }
}
