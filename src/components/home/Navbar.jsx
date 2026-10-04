import { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './Navbar.css';

export default function Navbar() {
  const navRef = useRef(null);

  const [isNavHidden, setIsNavHidden] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [dateDisplay, setDateDisplay] = useState({
    year: '',
    day: '',
  });
  const [timeDisplay, setTimeDisplay] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEcosystemMenuOpen, setIsEcosystemMenuOpen] = useState(false);

  const location = useLocation();

  const currentPage =
    location.pathname.replace('/', '') || 'home';

  useEffect(() => {
    const isMobile = window.matchMedia(
      '(max-width: 809.98px)'
    ).matches;

    const introDelay = isMobile
      ? (1 + 1.6) * 1000
      : (2.5 + 1.5) * 1000;

    const timer = setTimeout(() => {
      if (navRef.current) {
        navRef.current.style.animation = 'none';
        navRef.current.style.opacity = '1';
        navRef.current.style.transform = 'translateY(0)';
        navRef.current.style.transition =
          'transform 0.35s cubic-bezier(0.55, 0.45, 0.16, 1), opacity 0.35s ease';

        setIsReady(true);
      }
    }, introDelay);

    let lastScrollY = window.scrollY;

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

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReady]);

  useEffect(() => {
    setIsEcosystemMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const updateDate = () => {
      const date = new Date();

      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();

      const formatted = `${month}.${day}.${year}`;

      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const chineseDays = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ];

      const dayIndex = date.getDay();

      const dayText = `${days[dayIndex]} [${chineseDays[dayIndex]}]`;

      setDateDisplay({
        year: `[${formatted}]`,
        day: dayText,
      });
    };

    updateDate();

    const interval = setInterval(updateDate, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      setTimeDisplay(
        [now.getHours(), now.getMinutes(), now.getSeconds()]
          .map((value) => String(value).padStart(2, '0'))
          .join(':')
      );
    };

    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const isActive = (path) => {
    if (path === 'home') {
      return currentPage === 'home';
    }

    if (path === 'studios') {
      return [
        'studios',
        'web-studio',
        'photo-studio',
      ].includes(currentPage);
    }

    if (path === 'ecosystem') {
      return [
        'farm',
        'build',
        'springs',
      ].includes(currentPage);
    }

    if (path === 'about') {
      return [
        'about',
        'about/who-we-are',
        'about/careers',
        'core',
      ].includes(currentPage);
    }

    return currentPage === path;
  };

  return (
    <nav
      ref={navRef}
      className={`nav ${
        isNavHidden ? 'nav--hidden' : ''
      } ${isReady ? 'nav--ready' : ''}`}
    >
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img
            src="/images/alden-circle-logo-transparent.png"
            alt="ALDEN"
            className="nav-logo-image"
          />
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`nav-links ${
            isMobileMenuOpen ? 'mobile-open' : ''
          }`}
        >
          <Link
            to="/"
            className={`nav-link ${
              isActive('home') ? 'active' : ''
            }`}
          >
            <span>HOME</span>
          </Link>

          {/* Ecosystem */}
          <div
            className={`nav-dropdown ${
              isEcosystemMenuOpen ? 'is-open' : ''
            }`}
          >
            <button
              type="button"
              className={`nav-link nav-trigger ${
                isActive('ecosystem') ? 'active' : ''
              }`}
              onClick={() =>
                setIsEcosystemMenuOpen((open) => !open)
              }
              aria-expanded={isEcosystemMenuOpen}
            >
              <span>ECOSYSTEM</span>
              <span className="dropdown-arrow">+</span>
            </button>

            <div className="dropdown-menu">
              <div className="dropdown-section">
                <div className="dropdown-section-title">
                  Studios
                </div>

                <Link
                  to="/studios/web-studio/services"
                  className="dropdown-item"
                >
                  Web Studio
                </Link>

                <Link
                  to="/studios/photo-studio/services"
                  className="dropdown-item"
                >
                  Photo Studio
                </Link>
              </div>

              <div className="dropdown-section">
                <div className="dropdown-section-title">
                  Current Venture
                </div>

                <Link
                  to="/farm"
                  className="dropdown-item"
                >
                  ALDEN'S FARM
                </Link>
              </div>

              <div className="dropdown-section">
                <div className="dropdown-section-title">
                  Coming Soon
                </div>

                <Link
                  to="/build"
                  className="dropdown-item"
                >
                  ALDEN'S CONSTRUCTION
                </Link>

                <Link
                  to="/springs"
                  className="dropdown-item"
                >
                  ALDEN'S SPRINGS
                </Link>
              </div>
            </div>
          </div>

          {/* About */}
          <div className="nav-dropdown">
            <Link
              to="/about"
              className={`nav-link ${
                isActive('about') ? 'active' : ''
              }`}
            >
              <span>ABOUT</span>
              <span className="dropdown-arrow">+</span>
            </Link>

            <div className="dropdown-menu">
              <Link
                to="/about/who-we-are"
                className="dropdown-item"
              >
                Who Are We?
              </Link>

              <Link
                to="/core"
                className="dropdown-item"
              >
                Core
              </Link>

              <Link
                to="/about/careers"
                className="dropdown-item"
              >
                Careers
              </Link>
            </div>
          </div>
        </div>

        {/* Date / Time */}
        <div
          className={`nav-meta ${
            isMobileMenuOpen ? 'menu-open' : ''
          }`}
        >
          <span className="nav-date">
            {dateDisplay.year}
          </span>

          <span className="nav-day">
            {dateDisplay.day}
          </span>

          <time
            className="nav-clock"
            dateTime={new Date().toISOString()}
            aria-label={`Local time ${timeDisplay}`}
          >
            {timeDisplay}
          </time>
        </div>

        {/* Mobile Menu */}
        <button
          type="button"
          className={`hamburger-menu ${
            isMobileMenuOpen ? 'is-open' : ''
          }`}
          onClick={() =>
            setIsMobileMenuOpen((open) => !open)
          }
          aria-label={
            isMobileMenuOpen
              ? 'Close menu'
              : 'Open menu'
          }
          aria-expanded={isMobileMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}