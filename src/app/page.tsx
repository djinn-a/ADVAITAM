import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Lifestyle from "@/components/Lifestyle";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { VideoHero } from "@/components/video-hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Projects />
        <Lifestyle />

        <VideoHero
          src="/videos/origin_dummy.mp4"
          poster="/images/custom_poster.jpg"
        />

        <CTA />
      </main>
      <Footer />
    </>
  );
}
