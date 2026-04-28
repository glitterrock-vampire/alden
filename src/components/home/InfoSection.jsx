export default function InfoSection() {
  const services = [
    "Software Development",
    "UI / Visual Design",
    "User Experience Design",
    "Enterprise Design Thinking",
    "Research / Strategy",
  ];

  return (
    <section id="about" className="bg-black border-t border-white/10">
      {/* Main info block */}
      <div className="px-6 md:px-10 py-20 md:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-b border-white/10">
        {/* Left: big heading */}
        <div>
          <p className="text-white/30 text-xs tracking-widest uppercase mb-8">Info</p>
          <h2
            className="text-white text-3xl md:text-5xl font-black uppercase leading-tight mb-8"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            A [multidisciplinary] perspective informed by technology, design, and innovation.
          </h2>

          {/* Japanese characters accent */}
          <div className="flex gap-4 mt-12">
            <div className="text-white/10 text-5xl font-light" style={{ writingMode: "vertical-rl" }}>
              技術
            </div>
          </div>
        </div>

        {/* Right: description + services */}
        <div className="flex flex-col justify-between gap-12">
          <div>
            <p className="text-white/50 text-base leading-relaxed mb-6">
              A strategic approach led by clarity, precision, and intent.
              Every digital experience is engineered to be intuitive, scalable, and enduring.
            </p>
            <p className="text-white/40 text-sm leading-relaxed mb-10">
              Design to me is a bridge between emotion and function. My goal has always been to
              elevate everyday interactions into something more meaningful — quietly threading in
              moments of joy that catch us by surprise and stay with us for years to come.
            </p>
            <a
              href="#contact"
              className="inline-block border border-white/30 text-white/70 text-xs tracking-widest uppercase px-6 py-3 hover:border-white hover:text-white transition-all duration-300"
            >
              Say Hello →
            </a>
          </div>

          {/* Services list */}
          <div>
            <p className="text-white/20 text-xs tracking-widest uppercase mb-4">[Expertise & Services]</p>
            <div className="space-y-3">
              {services.map((service, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 text-white/50 text-sm tracking-widest uppercase border-b border-white/5 pb-3 hover:text-white/80 transition-colors duration-200 cursor-default"
                >
                  <span className="text-white/20 text-xs">0{i + 1}</span>
                  {service}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quote strip */}
      <div className="px-6 md:px-10 py-10 overflow-hidden">
        <p
          className="text-white/10 text-4xl md:text-7xl font-black uppercase whitespace-nowrap leading-none"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          QUIETLY POWERFUL DIGITAL EXPERIENCES &nbsp;&nbsp; QUIETLY POWERFUL DIGITAL EXPERIENCES
        </p>
      </div>
    </section>
  );
}