export default function ScrollIndicator({ current, total }: Readonly<{ current: number; total: number }>) {
  return (
    <aside
      aria-label="Scroll Progress"
      className="absolute bottom-4 sm:bottom-8 lg:bottom-12 left-[clamp(1.5rem,5vw,5rem)] z-20 flex flex-col items-center pointer-events-auto"
    >
      <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-[#E0E0E0] mb-2 sm:mb-3">
        0{current}
      </span>

      <div className="flex flex-col items-center gap-2 sm:gap-3">
        {/* eslint-disable-next-line react/no-array-index-key */}
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={"scroll-indicator-" + i}
            className={`transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              i + 1 === current 
                ? "w-[1px] h-6 sm:h-8 bg-[#C6A87C]" 
                : "w-1 h-1 rounded-full bg-white/30"
            }`}
          />
        ))}
      </div>

      <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] text-[#E0E0E0] mt-2 sm:mt-3">
        0{total}
      </span>

      <div className="mt-4 sm:mt-8 flex flex-col items-center gap-1.5 sm:gap-2">
        <span className="text-[8px] sm:text-[9px] font-bold tracking-[0.25em] text-[#E0E0E0]">
          SCROLL
        </span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="text-[#E0E0E0]"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </div>
    </aside>
  );
}
