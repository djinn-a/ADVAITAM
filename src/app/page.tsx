import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Projects from "@/components/Projects";
import Lifestyle from "@/components/Lifestyle";
import Cta from "@/components/CTA";
import Footer from "@/components/Footer";
import { VideoHero } from "@/components/video-hero";
import NatureInspired from "@/components/NatureInspired";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <NatureInspired/>
        <Philosophy />
        <Projects />
        <Lifestyle />

        <VideoHero
          src="/videos/origin_dummy.mp4"
          poster="/images/custom_poster.jpg"
        />

        <Cta />
      </main>
      <Footer />
    </>
  );
}
