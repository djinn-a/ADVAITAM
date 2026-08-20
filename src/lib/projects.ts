export type Project = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
};

export const projects: Project[] = [
  {
    id: "advaitam-17",
    name: "ADVAITAM 17",
    tagline: "Premium Residences",
    description: "Where nature meets contemporary living.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "advaitam-enclave",
    name: "ADVAITAM ENCLAVE",
    tagline: "Luxury Villas",
    description: "Private spaces. Timeless lifestyle.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "advaitam-resorts",
    name: "ADVAITAM RESORTS",
    tagline: "Resort Living",
    description: "Rejuvenate. Reconnect. Rediscover.",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?q=80&w=1200&auto=format&fit=crop",
  },
];
