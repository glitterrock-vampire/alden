(function() {
// Ensure page loads from top consistently
window.scrollTo(0, 0);

// Animation controller matching Framer site exactly
class AnimationController {
  constructor() {
    this.init();
  }

  init() {
    window.scrollTo(0, 0);
    this.setupIntersectionObserver();
    this.setupHoverEffects();
    this.setupParallax();
    this.setupStaggeredAnimations();
    this.setupLoadingAnimations();
    this.setupSmoothScroll();
  }

  // Intersection Observer for scroll animations with progressive blur-to-sharp for hero text
  setupIntersectionObserver() {
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: '0px 0px -10px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const ratio = entry.intersectionRatio;

        // Special handling for hero text content (not ALDEN letters)
        if (entry.target.closest('.hero-content') && !entry.target.classList.contains('alden-letter')) {
          // Progressive blur-to-sharp effect based on intersection ratio
          const blurAmount = Math.max(0, 8 - (ratio * 8)); // Starts at 8px blur, reduces to 0
          const opacity = Math.min(1, ratio + 0.3); // Minimum opacity of 0.3
          const scale = 0.95 + (ratio * 0.05); // Slight scale effect

          entry.target.style.filter = 'none';
          entry.target.style.opacity = opacity;
          entry.target.style.transform = `scale(${scale})`;
          entry.target.style.transition = 'all 0.3s ease-out';
        } else if (entry.target.classList.contains('featured')) {
          // Featured section gets standard blur-to-sharp and nav color change
          if (entry.isIntersecting) {
            entry.target.style.filter = 'none';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            // Change nav to dark text on light background
            document.querySelector('.nav').classList.add('nav--light');
          } else {
            entry.target.style.filter = 'none';
            entry.target.style.opacity = '0.6';
            entry.target.style.transform = 'translateY(20px) scale(0.98)';
            // Change nav back to light text
            document.querySelector('.nav').classList.remove('nav--light');
          }
          entry.target.style.transition = 'all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)';
        } else {
          // Standard behavior for other elements
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.style.filter = 'blur(0px)';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';

            const animationType = entry.target.dataset.animate;
            if (animationType) {
              this.triggerCustomAnimation(entry.target, animationType);
            }
          }
        }
      });
    }, observerOptions);

    // Observe hero content elements with progressive blur-to-sharp for now no blur
    document.querySelectorAll('.hero-content [data-animate-hero]').forEach(el => {
      el.style.filter = 'none';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';
      observer.observe(el);
    });

    // Observe other elements
    document.querySelectorAll('.animate-on-scroll, .featured').forEach(el => {
      if (!el.closest('.hero-content')) {
        el.style.filter = 'blur(3px)';
        el.style.opacity = '0.6';
        el.style.transform = 'translateY(20px) scale(0.98)';
        el.style.transition = 'all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)';
        observer.observe(el);
      }
    });
  }

  // Custom animation triggers matching Framer easing [0.55,0.45,0.16,1]
  triggerCustomAnimation(element, type) {
    const easing = 'cubic-bezier(0.55, 0.45, 0.16, 1)';
    
    switch(type) {
      case 'slide-left':
        element.style.animation = `slideInFromLeft 1.5s ${easing} forwards`;
        break;
      case 'slide-right':
        element.style.animation = `slideInFromRight 1.5s ${easing} forwards`;
        break;
      case 'fade-scale':
        element.style.animation = `fadeInScale 1.5s ${easing} forwards`;
        break;
      case 'text-reveal':
        element.style.animation = `textReveal 1.5s ${easing} forwards`;
        break;
    }
  }

  // Enhanced hover effects matching Framer interactions
  setupHoverEffects() {
    document.querySelectorAll('.hover-lift').forEach(element => {
      element.addEventListener('mouseenter', (e) => {
        e.target.style.transform = 'translateY(-5px) scale(1.02)';
        e.target.style.transition = 'all 0.3s ease';
      });
      
      element.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'translateY(0) scale(1)';
      });
    });

    // Image hover effects with tilt matching Framer
    document.querySelectorAll('.image-hover').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        element.style.transition = 'transform 0.6s ease';
      });
      
      element.addEventListener('mouseleave', (e) => {
        e.target.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });

    // Nav logo letters animation on hover
    const navLogo = document.querySelector('.logo');
    if (navLogo) {
      navLogo.addEventListener('mouseenter', () => {
        const letters = navLogo.querySelectorAll('.nav-letter');
        letters.forEach(letter => {
          letter.style.opacity = '0';
          letter.style.transform = 'translateX(20px)';
        });
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateX(0)';
          }, index * 100);
        });
      });
      navLogo.addEventListener('mouseleave', () => {
        const letters = navLogo.querySelectorAll('.nav-letter');
        letters.forEach(letter => {
          letter.style.opacity = '0';
          letter.style.transform = 'translateX(-20px)';
        });
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateX(0)';
          }, index * 50);
        });
      });
    }

    // Hero logo letters animation on hover
    const heroLogo = document.querySelector('.hero-alden-logo');
    if (heroLogo) {
      heroLogo.addEventListener('mouseenter', () => {
        const letters = heroLogo.querySelectorAll('.alden-letter');
        letters.forEach(letter => {
          letter.style.opacity = '0';
          letter.style.transform = 'translateX(50px)';
        });
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateX(0)';
          }, index * 100);
        });
      });
      heroLogo.addEventListener('mouseleave', () => {
        const letters = heroLogo.querySelectorAll('.alden-letter');
        letters.forEach(letter => {
          letter.style.opacity = '0';
          letter.style.transform = 'translateX(-50px)';
        });
        letters.forEach((letter, index) => {
          setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateX(0)';
          }, index * 50);
        });
      });
    }
  }

  // Parallax scrolling effects
  setupParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const scrollTop = scrolled;
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
      
      parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // Staggered animations for lists and grids
  setupStaggeredAnimations() {
    document.querySelectorAll('.stagger-animation').forEach(container => {
      const children = container.children;
      
      Array.from(children).forEach((child, index) => {
        child.style.opacity = '0';
        child.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          child.style.transition = 'all 0.6s cubic-bezier(0.55, 0.45, 0.16, 1)';
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, index * 100);
      });
    });
  }

  // Loading animations matching Framer appear animations exactly
  setupLoadingAnimations() {
    // Navigation animation - matching Framer delay 2.5s for desktop, 1s for mobile
    const nav = document.querySelector('[data-animate-hero="nav"]');
    if (nav) {
      const isMobile = window.matchMedia('(max-width: 809.98px)').matches;
      const delay = isMobile ? 1 : 2.5;
      
      nav.style.opacity = '0.001';
      nav.style.transform = 'translateX(-50%) translateY(-150px)';
      nav.style.willChange = 'transform';
      
      setTimeout(() => {
        nav.style.transition = `all 1.5s cubic-bezier(0.55, 0.45, 0.16, 1)`;
        nav.style.opacity = '1';
        nav.style.transform = 'translateX(-50%) translateY(0)';
      }, delay * 1000);
    }

    // ALDEN Letters animation - individual letters from both sides
    const aldenLetters = document.querySelectorAll('.alden-letter');
    aldenLetters.forEach((letter, index) => {
      const delay = index * 0.2; // Stagger by 0.2s for each letter
      
      setTimeout(() => {
        letter.style.transition = `all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)`;
        letter.style.opacity = '1';
        letter.style.transform = 'translateX(0)';
      }, delay * 1000);
    });

    // Large text animations - Alden Designs and Chinese characters
    // Note: "Alden" text removed, only ALDEN logo and Chinese remain
    const chineseElement = document.querySelector('[data-animate-hero="chinese"]');
    if (chineseElement) {
      chineseElement.style.opacity = '0.001';
      setTimeout(() => {
        chineseElement.style.transition = `all 1.2s cubic-bezier(0.55, 0.45, 0.16, 1)`;
        chineseElement.style.opacity = '1';
      }, 600);
    }

    // Hero description animations with proper staggering - more prominent fade-in
    const heroElements = document.querySelectorAll('[data-animate-hero="mason"], [data-animate-hero="bracket1"], [data-animate-hero="wong"], [data-animate-hero="bracket2"], [data-animate-hero="visual"], [data-animate-hero="swimmer"], [data-animate-hero="and"], [data-animate-hero="porsche"], [data-animate-hero="bio"]');
    heroElements.forEach((element) => {
      const delay = parseFloat(element.dataset.delay) || 0.1;
      
      element.style.opacity = '0';
      element.style.transform = 'translateY(40px)';
      
      setTimeout(() => {
        element.style.transition = `all 1.5s cubic-bezier(0.55, 0.45, 0.16, 1)`;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }, delay * 1000);
    });

    // Scroll instructions animation
    const scrollElement = document.querySelector('[data-animate-hero="scroll"]');
    if (scrollElement) {
      scrollElement.style.opacity = '0.001';
      setTimeout(() => {
        scrollElement.style.transition = `all 0.8s cubic-bezier(0.55, 0.45, 0.16, 1)`;
        scrollElement.style.opacity = '1';
      }, 1500);
    }
  }

  // Smooth scroll for anchor links
  setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Enhanced CSS animations matching Framer
const enhancedStyles = `
@keyframes slideInFromLeft {
  from {
    opacity: 0.001;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0.001;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInScale {
  from {
    opacity: 0.001;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes textReveal {
  from {
    opacity: 0.001;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

// Inject enhanced styles
const styleSheet = document.createElement('style');
styleSheet.textContent = enhancedStyles;
document.head.appendChild(styleSheet);

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const animationController = new AnimationController();
  
  // Make it globally available for other scripts
  window.animationController = animationController;
});

// Re-initialize animations on page navigation (for SPA-like behavior)
window.addEventListener('popstate', () => {
  setTimeout(() => {
    const animationController = new AnimationController();
  }, 100);
});

// Ensure page always loads from the top
window.addEventListener('load', () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 100);
});

})();
