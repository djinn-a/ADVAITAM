import Image from "next/image";

export default function NatureInspired() {
  return (
    <section className="relative w-full h-screen px-6 md:px-12 lg:px-24 2xl:px-32 bg-white overflow-hidden flex items-center">
      <div className="max-w-[1600px] mx-auto w-full h-full py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_1fr] gap-6 lg:gap-10">
        
        {/* 1. Top-Left (Text Area) */}
        <div className="lg:col-span-5 flex flex-col">
          {/* Eyebrow */}
          <div className="flex items-center gap-4">
            <span className="eyebrow text-brass-soft tracking-[0.3em] text-[10px] md:text-xs">ADVAITAM</span>
            <div className="h-[1px] w-8 md:w-12 bg-brass-soft"></div>
          </div>

          {/* Heading */}
          <h2 className="mt-2 xl:mt-4 text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-display text-charcoal leading-[1.1]">
            Nature-Inspired<br />
            <span className="italic text-brass-soft font-light">Living Redefined</span>
          </h2>

          {/* Paragraph */}
          <p className="mt-2 xl:mt-4 text-charcoal/80 text-xs md:text-sm xl:text-base leading-snug xl:leading-relaxed max-w-lg font-sans">
            At Advaitam, we believe true luxury isn&apos;t just about what you own — it&apos;s about how you live. Set in the serene landscapes of Jim Corbett, our developments bring together nature, thoughtful design and modern comfort to create spaces that nourish your mind, body and future.
          </p>

          {/* Spacer to push tags to the bottom */}
          <div className="flex-grow"></div>

          {/* Tags */}
          <div className="mt-2 xl:mt-4 mb-2 lg:mb-0 eyebrow text-[9px] md:text-[10px] xl:text-xs text-brass-soft tracking-[0.2em] flex gap-2 md:gap-3">
            <span>LUXURY</span>
            <span className="text-brass">/</span>
            <span>NATURE</span>
            <span className="text-brass">/</span>
            <span>WELLBEING</span>
          </div>
        </div>

        {/* 2. Top-Middle Image ("Exquisite Residences") */}
        <div className="lg:col-span-4 relative w-full h-full min-h-[300px] lg:min-h-[0] rounded-3xl overflow-hidden group">
          <Image
            src="/images/nature-section/exquisite-residences.jpg"
            alt="Exquisite Residences"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-white eyebrow tracking-[0.2em] leading-relaxed">
              EXQUISITE<br />RESIDENCES
            </p>
            <div className="h-[1px] w-8 bg-white/50 mt-3"></div>
          </div>
        </div>

        {/* 3. Right Tall Image ("Pristine Surroundings") */}
        <div className="lg:col-span-3 lg:row-span-2 relative w-full h-full min-h-[500px] lg:min-h-[0] rounded-3xl overflow-hidden group">
          <Image
            src="/images/nature-section/pristine-surroundings.jpg"
            alt="Pristine Surroundings"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/10 to-transparent"></div>
          <div className="absolute top-6 left-6 md:top-8 md:left-8">
            <p className="text-white eyebrow tracking-[0.2em] leading-relaxed">
              PRISTINE<br />SURROUNDINGS
            </p>
            <div className="h-[1px] w-8 bg-white/50 mt-3"></div>
          </div>
        </div>

        {/* 4. Bottom-Left Image ("Thoughtful Spaces") */}
        <div className="lg:col-span-5 relative w-full h-full min-h-[300px] lg:min-h-[0] rounded-3xl overflow-hidden group">
          <Image
            src="/images/nature-section/thoughtful-spaces.jpg"
            alt="Thoughtful Spaces"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-white eyebrow tracking-[0.2em] leading-relaxed">
              THOUGHTFUL<br />SPACES
            </p>
            <div className="h-[1px] w-8 bg-white/50 mt-3"></div>
          </div>
        </div>

        {/* 5. Bottom-Middle Image ("Curated Experiences") */}
        <div className="lg:col-span-4 relative w-full h-full min-h-[300px] lg:min-h-[0] rounded-3xl overflow-hidden group">
          <Image
            src="/images/nature-section/curated-experiences.jpg"
            alt="Curated Experiences"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
            <p className="text-white eyebrow tracking-[0.2em] leading-relaxed">
              CURATED<br />EXPERIENCES
            </p>
            <div className="h-[1px] w-8 bg-white/50 mt-3"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
