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
    image: "/images/project1.jpg",
  },
  {
    id: "advaitam-enclave",
    name: "ADVAITAM ENCLAVE",
    tagline: "Luxury Villas",
    description: "Private spaces. Timeless lifestyle.",
    image: "/images/project2.jpg",
  },
  {
    id: "advaitam-resorts",
    name: "ADVAITAM RESORTS",
    tagline: "Resort Living",
    description: "Rejuvenate. Reconnect. Rediscover.",
    image: "/images/project3.jpg",
  },
  {
    id: "advaitam-woods",
    name: "ADVAITAM WOODS",
    tagline: "Forest Retreats",
    description: "Immerse yourself in lush greenery.",
    image: "/images/project4.jpg",
  },
  {
    id: "advaitam-peaks",
    name: "ADVAITAM PEAKS",
    tagline: "Hilltop Estates",
    description: "Breathtaking views and serene living.",
    image: "/images/project5.jpg",
  },
  {
    id: "advaitam-waters",
    name: "ADVAITAM WATERS",
    tagline: "Lakeside Homes",
    description: "Tranquility by the pristine waters.",
    image: "/images/project6.jpg",
  },
];
