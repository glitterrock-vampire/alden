import { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Web Studio",
    subtitle: "Custom Development · E-Commerce · Automation · Cloud Hosting",
    tag: "W",
    image: "/__generating__/img_a826b4a179b8.png",
    fallbackGradient: "from-slate-900 via-blue-950 to-black",
    href: "#studios",
    year: "2026",
  },
  {
    id: 2,
    title: "Photo Studio",
    subtitle: "Portraits · Events · Landscapes · Creative Projects",
    tag: "P",
    image: "/__generating__/img_42fdb88f3863.png",
    fallbackGradient: "from-stone-900 via-amber-950 to-black",
    href: "#studios",
    year: "2026",
  },
  {
    id: 3,
    title: "Digital Strategy",
    subtitle: "Research · Planning · Implementation · Optimization",
    tag: "D",
    image: "/__generating__/img_257003ee01f6.png",
    fallbackGradient: "from-zinc-900 via-emerald-950 to-black",
    href: "#studios",
    year: "2026",
  },
  {
    id: 4,
    title: "ALDEN'S FARM",
    subtitle: "Whole Foods · Chicken · Eggs · Supplies",
    tag: "F",
    image: "/__generating__/img_cb74e15f79bf.png",
    fallbackGradient: "from-green-950 via-stone-900 to-black",
    href: "#ecosystem",
    year: "2026",
  },
  {
    id: 5,
    title: "ALDEN'S CONSTRUCTION",
    subtitle: "Affordable Homes · Steel Frames · Coming 2026",
    tag: "B",
    image: "/__generating__/img_e88f6fbccde6.png",
    fallbackGradient: "from-neutral-900 via-orange-950 to-black",
    href: "#ecosystem",
    year: "2026",
  },
];

export default function ProjectsShowcase() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section id="studios" className="relative bg-black">
      {/* Section header */}
      <div className="px-6 md:px-10 pt-20 pb-10 border-t border-white/10">
        <div className="flex justify-between items-end">
          <p className="text-white/30 text-xs tracking-widest uppercase">Selected Work</p>
          <p className="text-white/30 text-xs tracking-widest">0{projects.length} Projects</p>
        </div>
      </div>

      {/* Projects list — Contrast Design style */}
      <div className="divide-y divide-white/10">
        {projects.map((project, index) => (
          <a
            key={project.id}
            href={project.href}
            className="relative block group cursor-pointer overflow-hidden"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Background image on hover */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out"
              style={{
                backgroundImage: `url('${project.image}')`,
                opacity: hoveredIndex === index ? 1 : 0,
                filter: "brightness(0.35)",
                transform: hoveredIndex === index ? "scale(1.03)" : "scale(1.08)",
              }}
            />
            {/* Fallback gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${project.fallbackGradient} transition-opacity duration-700`}
              style={{ opacity: hoveredIndex === index ? 0 : 0 }}
            />

            {/* Content */}
            <div
              className="relative z-10 flex items-center justify-between px-6 md:px-10 py-8 md:py-10 transition-all duration-300"
              style={{
                backgroundColor: hoveredIndex === index ? "transparent" : "transparent",
              }}
            >
              <div className="flex items-center gap-6 md:gap-12">
                {/* Index number */}
                <span className="text-white/20 text-xs font-mono w-6 hidden md:block">
                  0{index + 1}
                </span>
                {/* Tag letter */}
                <div
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/20 flex items-center justify-center text-white/60 text-sm font-bold transition-all duration-300 group-hover:border-white/60 group-hover:text-white"
                >
                  {project.tag}
                </div>
                {/* Title & subtitle */}
                <div>
                  <h3
                    className="text-white font-bold text-xl md:text-3xl tracking-tight transition-all duration-300 group-hover:translate-x-2"
                    style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif" }}
                  >
                    {project.title}
                  </h3>
                  <p className="text-white/30 text-xs md:text-sm tracking-widest mt-1 transition-all duration-300 group-hover:text-white/60">
                    {project.subtitle}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-6 md:gap-10">
                <span className="text-white/20 text-xs tracking-widest hidden md:block">{project.year}</span>
                <div className="text-white/30 group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom accent line */}
            <div
              className="absolute bottom-0 left-0 h-px bg-white/80 transition-all duration-500"
              style={{ width: hoveredIndex === index ? "100%" : "0%" }}
            />
          </a>
        ))}
      </div>
    </section>
  );
}