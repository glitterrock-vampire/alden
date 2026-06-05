import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function Navbar() {
  const navRef = useRef(null);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dateDisplay, setDateDisplay] = useState({ year: '', day: '' });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const currentPage = location.pathname.replace('/', '') || 'home';

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 809.98px)').matches;
    const introDelay = isMobile ? (1 + 1.6) * 1000 : (2.5 + 1.5) * 1000;

    const timer = setTimeout(() => {
      if (navRef.current) {
        navRef.current.style.animation = 'none';
        navRef.current.style.opacity = '1';
        navRef.current.style.transform = 'translateY(0)';
        navRef.current.style.transition = 'transform 0.35s cubic-bezier(0.55, 0.45, 0.16, 1), opacity 0.35s ease';
        setIsReady(true);
      }
    }, introDelay);

    const handleScroll = () => {
      if (!isReady || !navRef.current) return;

      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (Math.abs(delta) < 4) return;

      if (delta > 0 && currentScrollY > 100) {
        setIsNavHidden(true);
      } else {
        setIsNavHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReady]);

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const year = date.getFullYear();
      const formatted = `${month}.${day}.${year}`;

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const chineseDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
      const dayIndex = date.getDay();
      const dayText = `${days[dayIndex]} [${chineseDays[dayIndex]}]`;

      setDateDisplay({ year: `[${formatted}]`, day: dayText });
    };

    updateDate();
    const interval = setInterval(updateDate, 60000);
    return () => clearInterval(interval);
  }, []);

  const isActive = (path) => {
    if (path === 'home') return currentPage === 'home';
    if (path === 'studios') return ['studios', 'web-studio', 'photo-studio'].includes(currentPage);
    if (path === 'ecosystem') return ['farm', 'build', 'springs'].includes(currentPage);
    if (path === 'about') return ['about', 'about/who-we-are', 'about/careers', 'core'].includes(currentPage);
    return currentPage === path;
  };

  return (
    <>
      <nav
        ref={navRef}
        className="nav"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
          padding: '24px',
          animation: 'slideDown 1.5s 2.5s cubic-bezier(0.55, 0.45, 0.16, 1) forwards',
          opacity: isNavHidden ? 0 : (isReady ? 1 : 0.001),
          transform: isNavHidden ? 'translateY(-120%)' : (isReady ? 'translateY(0)' : 'translateY(-150px)'),
          mixBlendMode: 'difference',
          background: 'transparent',
          transition: isReady ? 'transform 0.35s cubic-bezier(0.55, 0.45, 0.16, 1), opacity 0.35s ease' : 'none',
        }}
      >
        <div className="nav-container">
          {/* Hamburger Menu Button (Mobile Only) */}
          <button
            className="hamburger-menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>

          {/* Logo */}
          <Link to="/" className="logo">
            {['A', 'L', 'D', 'E', 'N'].map((letter, index) => (
              <span key={letter} className="nav-letter" style={{ transitionDelay: `${index * 0.1}s` }}>
                {letter}
              </span>
            ))}
          </Link>

          {/* Navigation Links */}
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <Link to="/" className={`nav-link ${isActive('home') ? 'active' : ''}`}>
              <span className="nav-link-text">HOME</span>
            </Link>

            <div className="nav-dropdown">
              <Link to="/ecosystem" className={`nav-link ${isActive('ecosystem') ? 'active' : ''}`}>
                <span className="nav-link-text">ECOSYSTEM</span>
                <span className="dropdown-arrow">+</span>
              </Link>
              <div className="dropdown-menu">
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Studios</div>
                  <Link to="/studios/web-studio/services" className="dropdown-item">Web Studio</Link>
                  <Link to="/studios/photo-studio/services" className="dropdown-item">Photo Studio</Link>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Current Ventures</div>
                  <Link to="/farm" className="dropdown-item">ALDEN'S FARM</Link>
                  <Link to="/build" className="dropdown-item">ALDEN'S CONSTRUCTION</Link>
                </div>
                <div className="dropdown-section">
                  <div className="dropdown-section-title">Coming Soon</div>
                  <Link to="/springs" className="dropdown-item">ALDEN'S SPRINGS</Link>
                </div>
              </div>
            </div>

            <div className="nav-dropdown">
              <Link to="/about" className={`nav-link ${isActive('about') ? 'active' : ''}`}>
                <span className="nav-link-text">ABOUT</span>
                <span className="dropdown-arrow">+</span>
              </Link>
              <div className="dropdown-menu">
                <Link to="/about/who-we-are" className="dropdown-item">Who Are We?</Link>
                <Link to="/core" className="dropdown-item">Core</Link>
                <Link to="/about/careers" className="dropdown-item">Careers</Link>
              </div>
            </div>

          </div>

          {/* Date Display */}
          <div className={`nav-year ${isMobileMenuOpen ? 'menu-open' : ''}`}>
            <span className="year-current">{dateDisplay.year}</span>
            <span className="day-current">{dateDisplay.day}</span>
          </div>
        </div>
      </nav>

      <style>{`
        @media (max-width: 809.98px) {
          .nav {
            animation: slideDown 1.6s 1s cubic-bezier(0.55, 0.45, 0.16, 1) forwards !important;
            padding: 24px 16px !important;
          }
          
          .nav-container {
            justify-content: space-between;
            align-items: center;
            position: relative;
          }
          
          .hamburger-menu {
            position: absolute;
            left: auto;
            right: 0;
            order: 1;
          }
          
          .nav-year {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            align-items: center;
            order: 2;
            transition: opacity 0.25s ease, visibility 0.25s ease;
          }

          .nav-year.menu-open {
            opacity: 0;
            visibility: hidden;
          }
          
          .logo {
            position: absolute;
            left: 0;
            right: auto;
            order: 3;
          }
          
          .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.98);
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 32px;
            padding: 80px 24px;
            transform: translateX(100%);
            transition: transform 0.4s cubic-bezier(0.55, 0.45, 0.16, 1);
            opacity: 0;
            visibility: hidden;
          }
          
          .nav-links.mobile-open {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
          }
          
          .nav-link {
            transform: scale(1);
            height: auto;
          }
          
          .nav-link-text {
            font-size: 24px;
          }
          
          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            background: transparent;
            border: none;
            min-width: auto;
            padding: 16px 0 0 0;
            text-align: center;
          }
          
          .dropdown-section-title {
            font-size: 14px;
            padding: 8px 0 4px 0;
          }
          
          .dropdown-item {
            font-size: 18px;
            padding: 8px 0;
          }
          
          .hamburger-menu {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            width: 30px;
            height: 24px;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 0;
            z-index: 1001;
          }
          
          .hamburger-line {
            width: 30px;
            height: 2px;
            background: #ffffff;
            border-radius: 2px;
            transition: all 0.3s cubic-bezier(0.55, 0.45, 0.16, 1);
            transform-origin: center;
          }
          
          .hamburger-line.open:nth-child(1) {
            transform: rotate(45deg) translate(6px, 6px);
          }
          
          .hamburger-line.open:nth-child(2) {
            opacity: 0;
            transform: translateX(-10px);
          }
          
          .hamburger-line.open:nth-child(3) {
            transform: rotate(-45deg) translate(6px, -6px);
          }
        }

        @media (min-width: 810px) {
          .hamburger-menu {
            display: none;
          }
          
          .nav-container {
            justify-content: space-between;
          }
          
          .logo {
            position: absolute;
            left: 0;
            order: 1;
          }
          
          .nav-links {
            order: 2;
          }
          
          .nav-year {
            position: absolute;
            right: 0;
            order: 3;
          }
        }

        .nav-container {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          max-width: 2500px;
          margin: 0 auto;
          position: relative;
        }

        .logo {
          text-decoration: none;
          transition: opacity 0.3s cubic-bezier(0.55, 0.45, 0.16, 1);
          display: flex;
          align-items: center;
          gap: 0;
          position: absolute;
          left: 0;
        }

        .logo:hover {
          opacity: 0.8;
        }

        .logo:hover .nav-letter {
          opacity: 0.5;
          transform: translateY(-10px);
        }

        .nav-letter {
          font-family: 'Koulen', cursive;
          font-size: 28px;
          letter-spacing: 0.02em;
          color: #ffffff;
          transition: all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1);
          display: inline-block;
          opacity: 1;
          transform: translateX(0);
        }

        .nav-links {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 24px;
        }

        @media (max-width: 1199.98px) {
          .nav-links {
            gap: 16px;
          }
        }

        @media (max-width: 809.98px) {
          .nav-links {
            flex-direction: column;
            gap: 8px;
          }
          .nav-link {
            transform: scale(0.9);
          }
        }

        .nav-link {
          text-decoration: none;
          position: relative;
          overflow: hidden;
          height: 20px;
          display: flex;
          align-items: center;
        }

        .nav-link-text {
          font-family: 'Roboto Mono', monospace;
          font-size: 16px;
          line-height: 1.4;
          color: #ffffff;
          opacity: 0.8;
          transition: all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1);
          display: block;
        }

        .dropdown-arrow {
          font-family: 'Koulen', cursive;
          font-size: 12px;
          margin-left: 8px;
          opacity: 0.6;
          transition: transform 0.3s ease;
          display: inline-block;
        }

        .nav-dropdown:hover .dropdown-arrow {
          transform: rotate(45deg);
          opacity: 1;
        }

        .nav-link.active .nav-link-text {
          position: relative;
          padding-left: 12px;
        }

        .nav-link.active .nav-link-text::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          background: #ffffff;
          border-radius: 0;
        }

        .nav-link:hover .nav-link-text {
          transform: translateY(-20px);
        }

        .nav-dropdown {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background: rgba(0, 0, 0, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          min-width: 200px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s cubic-bezier(0.55, 0.45, 0.16, 1);
          z-index: 1000;
          backdrop-filter: blur(10px);
          pointer-events: none;
        }

        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .dropdown-section {
          padding: 8px 0;
        }

        .dropdown-section:first-child {
          padding-top: 4px;
        }

        .dropdown-section:last-child {
          padding-bottom: 4px;
        }

        .dropdown-section-title {
          padding: 8px 20px 4px 20px;
          color: rgba(255, 255, 255, 0.5);
          font-family: 'Roboto Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .dropdown-item {
          display: block;
          padding: 8px 20px;
          color: rgba(255, 255, 255, 0.9);
          text-decoration: none;
          font-family: 'Roboto Mono', monospace;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
        }

        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 1);
          padding-left: 28px;
        }

        .dropdown-item::before {
          content: '';
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 4px;
          height: 4px;
          background: #c8a84e;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .dropdown-item:hover::before {
          opacity: 1;
          left: 16px;
        }

        .nav-year {
          position: absolute;
          right: 0;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          width: auto;
          height: auto;
          cursor: default;
        }

        .year-current {
          font-family: 'Roboto Mono', monospace;
          font-size: 14px;
          color: #ffffff;
          white-space: nowrap;
          line-height: 1.4;
        }

        .day-current {
          font-family: 'Roboto Mono', monospace;
          font-size: 12px;
          color: #ffffff;
          white-space: nowrap;
          margin-top: 2px;
          display: block;
          line-height: 1.4;
          opacity: 0.8;
        }

        @media (max-width: 809.98px) {
          .logo {
            left: 0;
            right: auto;
          }

          .nav-year {
            right: auto;
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0.001;
            transform: translateY(-150px);
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
      `}</style>
    </>
  );
}
