import Image from "next/image";

const images = [
  { id: 1, src: "/images/lifestyle-1.jpg", alt: "Person walking in a lush green forest" },
  { id: 2, src: "/images/lifestyle-2.jpg", alt: "Breathtaking mountain landscape with a luxury home" },
  { id: 3, src: "/images/lifestyle-3.jpg", alt: "Cozy outdoor firepit area at night" },
  { id: 4, src: "/images/lifestyle-4.jpg", alt: "Family walking together in a beautiful natural setting" },
];

export default function Lifestyle() {
  return (
    <section className="px-6 py-12 sm:px-10 sm:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-12 lg:flex-row lg:gap-16">
        
        {/* Text Content */}
        <div className="w-full shrink-0 lg:w-[35%] xl:w-[30%]">
          <p className="eyebrow font-bold text-brass">CRAFTED FOR LIFE</p>
          <h2 className="mt-6 font-display text-4xl leading-[1.1] text-charcoal sm:text-5xl lg:text-[3.25rem]">
            Spaces that inspire.<br />
            Experiences that stay.
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
        <div className="w-full">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:gap-6">
            {images.map((img) => (
              <div key={img.id} className="group relative aspect-square overflow-hidden bg-cream-soft">
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
