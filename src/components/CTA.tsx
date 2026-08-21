import { HiOutlineArrowDownTray } from "react-icons/hi2";

export default function Cta() {
  return (
    <section className="bg-ink py-8 border-b border-ivory/10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 lg:flex-row px-6 sm:px-10">
        
        {/* Left Side: Headline */}
        <div className="text-center lg:text-left">
          <h2 className="font-display text-2xl text-ivory sm:text-3xl lg:text-[34px] lg:whitespace-nowrap">
            Begin your journey with Advaitam.
          </h2>
        </div>

        {/* Right Side: Buttons */}
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#book"
            className="inline-flex h-12 items-center justify-center rounded-md bg-brass px-8 text-[12px] font-bold tracking-[0.15em] text-ink transition-all hover:bg-brass-soft"
          >
            BOOK A SITE VISIT
          </a>
          <a
            href="#brochure"
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
