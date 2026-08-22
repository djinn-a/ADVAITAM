import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { projects } from "@/lib/projects";

export default function Projects() {
  const tallProject = projects[0];
  const topStackedProject = projects[1];
  const bottomStackedProject = projects[2];

  return (
    <section id="projects" className="bg-white px-[clamp(1.5rem,5vw,2.5rem)] py-[clamp(4rem,8vw,8rem)]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-[clamp(1.5rem,3vw,2rem)] lg:grid-cols-12 lg:h-[clamp(480px,50vw,600px)]">
          
          {/* Column 1: Text Content */}
          <div className="col-span-1 flex flex-col justify-center lg:col-span-3">
            <h2 className="font-display text-[clamp(3rem,6vw,4.5rem)] leading-[1.1] text-charcoal mb-[clamp(1.5rem,3vw,2rem)]">
              Our<br />Projects
            </h2>
            <p className="text-stone leading-relaxed max-w-md text-[clamp(1rem,1.5vw,1.125rem)] mb-[clamp(2rem,4vw,3rem)]">
              Thoughtfully designed destinations that blend contemporary living with the raw beauty of Jim Corbett.
            </p>
            <div>
              <Link
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg bg-charcoal px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink"
              >
                Explore Now
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Column 2: Tall Project Card */}
          {tallProject && (
            <div className="col-span-1 lg:col-span-4 relative group overflow-hidden rounded-2xl h-[clamp(350px,50vh,500px)] lg:h-full">
              <Image
                src={tallProject.image}
                alt={tallProject.name}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                fetchPriority="high"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none" />
              
              <div className="absolute inset-x-0 bottom-0 p-[clamp(1.5rem,3vw,2rem)] flex items-end justify-between">
                <div className="pr-4">
                  <h3 className="font-display text-[clamp(1.5rem,3vw,1.875rem)] tracking-wide text-white mb-2 uppercase">
                    {tallProject.name}
                  </h3>
                  <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/90 line-clamp-2">
                    {tallProject.tagline}
                  </p>
                </div>
                <Link
                  href={`#${tallProject.id}`}
                  className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white text-charcoal transition-transform hover:scale-110"
                  aria-label={`View ${tallProject.name}`}
                >
                  <ArrowUpRight size={20} strokeWidth={2} />
                </Link>
              </div>
            </div>
          )}

          {/* Column 3: Stacked Project Cards */}
          <div className="col-span-1 lg:col-span-5 flex flex-col gap-[clamp(1.5rem,3vw,2rem)] lg:h-full">
            {/* Top Stacked Card */}
            {topStackedProject && (
              <div className="relative group overflow-hidden rounded-2xl h-[clamp(250px,30vh,350px)] lg:h-auto lg:flex-1">
                <Image
                  src={topStackedProject.image}
                  alt={topStackedProject.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-0 p-[clamp(1.5rem,3vw,2rem)] flex items-end justify-between">
                  <div className="pr-4">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,1.875rem)] tracking-wide text-white mb-2 uppercase">
                      {topStackedProject.name}
                    </h3>
                    <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/90 line-clamp-2">
                      {topStackedProject.tagline}
                    </p>
                  </div>
                  <Link
                    href={`#${topStackedProject.id}`}
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white text-charcoal transition-transform hover:scale-110"
                    aria-label={`View ${topStackedProject.name}`}
                  >
                    <ArrowUpRight size={20} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            )}

            {/* Bottom Stacked Card */}
            {bottomStackedProject && (
              <div className="relative group overflow-hidden rounded-2xl h-[clamp(250px,30vh,350px)] lg:h-auto lg:flex-1">
                <Image
                  src={bottomStackedProject.image}
                  alt={bottomStackedProject.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform transform-gpu"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/20 to-transparent pointer-events-none" />
                
                <div className="absolute inset-x-0 bottom-0 p-[clamp(1.5rem,3vw,2rem)] flex items-end justify-between">
                  <div className="pr-4">
                    <h3 className="font-display text-[clamp(1.5rem,3vw,1.875rem)] tracking-wide text-white mb-2 uppercase">
                      {bottomStackedProject.name}
                    </h3>
                    <p className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/90 line-clamp-2">
                      {bottomStackedProject.tagline}
                    </p>
                  </div>
                  <Link
                    href={`#${bottomStackedProject.id}`}
                    className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-white text-charcoal transition-transform hover:scale-110"
                    aria-label={`View ${bottomStackedProject.name}`}
                  >
                    <ArrowUpRight size={20} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
