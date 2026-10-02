export const HERO_TITLE_WORDS = [
  { text: 'ALDEN', className: 'is-web' },
  { text: 'WEB STUDIO', className: 'is-services' },
];

export const WEB_STUDIO_SERVICES = [
  { title: 'Digital Transformation', description: 'Transform your business with cutting-edge technologies to enhance processes, culture, and customer experiences.', features: ['Assess Current State', 'Create Digital Strategic Plan', 'Implement and Integrate', 'Monitor and Optimize'] },
  { title: 'e-Commerce', description: 'Comprehensive solution for launching, optimizing, and managing online stores with advanced features.', features: ['Product & Inventory Management', 'Order & Shipping Management', 'Multi-Vendor Marketplace', 'Secure Payment Gateways'] },
  { title: 'Website Development', description: 'Custom, scalable, and high-performing websites and applications to elevate your online presence.', features: ['Tailored Made To Your Needs', 'Scalable Solutions', 'Seamless Performance', 'Enhanced Engagement'] },
  { title: 'Mobile App Development', description: 'Custom, high-performance iOS and Android apps to engage and elevate your business.', features: ['Custom Development', 'Seamless Integration', 'Innovative Design', 'Enhanced Security'] },
  { title: 'Automation & Integration', description: 'Transform with integrated digital technologies and automation for efficiency and growth.', features: ['Task Automation', 'Data Integration', 'Process Optimization', 'Cost Reduction'] },
  { title: 'Help Desk Solution', description: 'Enhance support with 24/7 help desk, streamlining issue resolution and improving satisfaction.', features: ['Ticket Management', 'Multi-Channel Support', 'Automated Responses', 'Knowledge Base'] },
  { title: 'Cloud Hosting', description: 'Scalable, secure, and cost-effective cloud services for digital efficiency and reliability.', features: ['Web App & Website Hosting', 'Scalable Resources', 'Enhanced Security', 'Automated Backups'] },
  { title: 'Content Marketing', description: 'Boost engagement and drive growth with targeted, high-quality content tailored to your audience.', features: ['Audience Research', 'Content Planning', 'Content Creation', 'Performance Analysis'] },
  { title: 'Quality Assurance', description: 'Ensure software reliability and user satisfaction with comprehensive testing strategies.', features: ['Bug Detection', 'Performance Testing', 'Usability Testing', 'Automated Testing'] },
  { title: 'Load Testing', description: 'Optimize system performance ensuring scalability, stability, and peak traffic readiness.', features: ['Realistic User Simulations', 'Scalability Assessment', 'Performance Optimization', 'Detailed Reporting'] },
  { title: 'S&G Cloud Hosting', description: 'Unlock the Power of the Cloud for Your S&G Smart Lock Solutions with managed hosting.', features: ['Cloud Server Setup & Integration', '24/7 Managed Hosting', 'Scalable and Secure', 'Backup & Disaster Recovery'] },
];

export const PROCESS_STEPS = [
  { title: 'Discovery', description: 'We map your business goals, audience, product logic, and technical requirements before design begins.' },
  { title: 'Strategy', description: 'We define the experience, architecture, rollout plan, and success metrics so the build has a clear direction.' },
  { title: 'Development', description: 'We build the interface, backend, integrations, automations, and performance foundation with care.' },
  { title: 'Launch & Support', description: 'We deploy, monitor, refine, and support the system so it keeps working beyond the first release.' },
];

const PLACEHOLDER_IMAGES = {
  cdt: 'https://framerusercontent.com/images/o6w4CVRNseGWbrL67Z02tHFMU.png',
  zenith: 'https://framerusercontent.com/images/jGIDW70qyfBuP6v8UKUwumU8HGo.png',
  glowing: 'https://framerusercontent.com/images/Dqg69EBbfiJJHyD2a4T7Ki7uPuc.png',
};

export const WEB_PORTFOLIO_PROJECTS = [
  { id: 1, title: 'CDT JAMAICA', category: 'DIGITAL PLATFORM', filter: 'enterprise', href: 'https://cdtjamaica.org', image: PLACEHOLDER_IMAGES.cdt },
  { id: 2, title: 'TOTALLY BAKED', category: 'E-COMMERCE', filter: 'fullstack', href: 'https://totally-baked-ja.vercel.app', image: 'https://framerusercontent.com/images/XbAyT67MOmZ9iWY72g8FEkEZZFM.png' },
  { id: 3, title: 'ZENITH TEAS', category: 'TEA MANAGEMENT', filter: 'fullstack', href: 'https://zenith-taupe.vercel.app', image: PLACEHOLDER_IMAGES.zenith },
  { id: 4, title: 'GLOWING LANDING', category: 'LANDING PAGE', filter: 'frontend', href: 'https://glowing-landing-page.netlify.app', image: PLACEHOLDER_IMAGES.glowing },
  { id: 5, title: 'BLACKBOX SYSTEM', category: 'IOT SYSTEM', filter: 'fullstack', href: 'https://blackbox-online.vercel.app', image: 'https://framerusercontent.com/images/fKFKHb1VZsz50W8Ctq7RIZW4SRw.png' },
  { id: 6, title: 'DAVID P BLAKE', category: 'PERSONAL PORTFOLIO', filter: 'frontend', href: 'https://davidpblake.org', image: 'https://framerusercontent.com/images/placeholder.png' },
  { id: 10, title: 'TOBAGO EAST MEDICAL SERVICES', category: 'HEALTHCARE PLATFORM', filter: 'fullstack', href: 'https://tobago-medical-hub.vercel.app/', image: '/images/tobago-medical-hub.svg' },
  { id: 7, title: 'ALDEN FARM', category: 'ECOSYSTEM / AGRICULTURE', filter: 'ecosystem', href: '/farm', image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/bc9876621_generated_c9f73a67.png' },
  { id: 8, title: 'ALDEN BUILD', category: 'ECOSYSTEM / CONSTRUCTION', filter: 'ecosystem', href: '/build', image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/50c3d2b40_generated_95198927.png' },
  { id: 9, title: 'ALDEN SPRINGS', category: 'ECOSYSTEM / WATER', filter: 'ecosystem', href: '/springs', image: 'https://media.base44.com/images/public/69ee1b9c56c5f45aaae16bea/9633f1d94_generated_82c4a200.png' },
];

export const PORTFOLIO_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'fullstack', label: 'Fullstack' },
  { id: 'enterprise', label: 'Enterprise' },
];