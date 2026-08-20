import Image from "next/image";

const images = [
  { id: 1, src: "/images/lifestyle-1.jpg", alt: "Person walking in a lush green forest" },
  { id: 2, src: "/images/lifestyle-2.jpg", alt: "Breathtaking mountain landscape with a luxury home" },
  { id: 3, src: "/images/lifestyle-3.jpg", alt: "Cozy outdoor firepit area at night" },
  { id: 4, src: "/images/lifestyle-4.jpg", alt: "Family walking together in a beautiful natural setting" },
];

export default function Lifestyle() {
  return (
    <section className="bg-[#f6f5f2] px-6 pt-6 pb-10 sm:px-10 sm:pt-8 sm:pb-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        
        {/* Text Content */}
        <div className="w-full shrink-0 lg:w-[33%] xl:w-[32%]">
          <p className="eyebrow font-bold text-brass uppercase tracking-[0.15em] text-[11px]">CRAFTED FOR LIFE</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.15] text-charcoal sm:text-5xl lg:text-[2.25rem] xl:text-[2.5rem]">
            <span className="whitespace-nowrap">Spaces that inspire.</span><br />
            <span className="whitespace-nowrap">Experiences that stay.</span>
          </h2>
          <a
            href="#lifestyle"
            className="group mt-10 inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.15em] text-brass transition-colors duration-300 hover:text-brass-soft"
          >
            VIEW LIFESTYLE{" "}
            <span className="text-brass transition-transform duration-300 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>

        {/* Image Grid */}
        <div className="w-full lg:w-[67%] xl:w-[68%]">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4 sm:gap-3">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-[5/4] overflow-hidden bg-cream-soft">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
