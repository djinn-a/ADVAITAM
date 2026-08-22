import { HiOutlineArrowDownTray } from "react-icons/hi2";

export default function Cta() {
  return (
    <section className="bg-ink py-[clamp(2rem,4vw,3rem)] border-b border-ivory/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-[clamp(1.5rem,3vw,2rem)] lg:flex-row px-[clamp(1.5rem,4vw,2.5rem)]">
        
        {/* Left Side: Headline */}
        <div className="text-center lg:text-left">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.125rem)] text-ivory lg:whitespace-nowrap">
            Begin your journey with Advaitam.
          </h2>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col items-center gap-[clamp(1rem,2vw,1.5rem)] sm:flex-row">
          <a
            href="#book"
            aria-label="Book a site visit"
            className="inline-flex h-12 items-center justify-center rounded-md bg-brass px-8 text-[12px] font-bold tracking-[0.15em] text-ink transition-all hover:bg-brass-soft"
          >
            BOOK A SITE VISIT
          </a>
          <a
            href="#brochure"
            aria-label="Download our brochure"
            className="inline-flex h-12 items-center justify-center gap-3 rounded-md border border-ivory/20 px-8 text-[12px] font-bold tracking-[0.15em] text-ivory transition-all hover:bg-ivory/10"
          >
            DOWNLOAD BROCHURE
            <HiOutlineArrowDownTray size={16} />
          </a>
        </div>
        
      </div>
    </section>
  );
}
