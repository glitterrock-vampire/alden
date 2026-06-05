import React from 'react';
import SpotifyNowPlaying from './SpotifyNowPlaying';

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-white/10">
      {/* Top bar */}
      <div className="px-6 md:px-10 py-16 md:py-24 grid grid-cols-1 md:grid-cols-4 gap-12 border-b border-white/10">
        {/* Left */}
        <div>
          <p className="text-white/30 text-xs tracking-widest uppercase mb-6">Location</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Kingston, Jamaica<br />
            Building the future,<br />
            one innovation at a time.
          </p>
        </div>

        {/* Center: big say hello */}
        <div className="flex items-center justify-center">
          <a
            href="mailto:hello@alden.design"
            className="text-white text-3xl md:text-5xl font-black uppercase hover:text-white/50 transition-colors duration-300"
            style={{ fontFamily: "'Arial Black', sans-serif" }}
          >
            Say Hello.
          </a>
        </div>

        {/* Right: socials */}
        <div className="md:text-right">
          <p className="text-white/30 text-xs tracking-widest uppercase mb-6">Connect</p>
          <div className="space-y-2">
            {["Instagram", "LinkedIn", "GitHub", "Twitter"].map((s) => (
              <div key={s}>
                <a
                  href="#"
                  className="text-white/40 text-sm tracking-widest uppercase hover:text-white transition-colors duration-200"
                >
                  {s}
                </a>
              </div>
            ))}
          </div>
        </div>

        <SpotifyNowPlaying />
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span
          className="text-white/20 text-xs tracking-widest font-black uppercase"
          style={{ fontFamily: "'Arial Black', sans-serif" }}
        >
          ALDEN
        </span>
        <span className="text-white/20 text-xs tracking-widest">
          © 2026 — All rights reserved
        </span>
        <span className="text-white/20 text-xs tracking-widest uppercase">
          Technology · Innovation · Design
        </span>
      </div>
    </footer>
  );
}
