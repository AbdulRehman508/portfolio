import {
  ContactChannel,
  Education,
  Experience,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  Stat,
} from '../models/portfolio.model';

export const PROFILE: Profile = {
  name: 'Abdul Rehman',
  firstName: 'Abdul',
  lastName: 'Rehman',
  role: 'Software Engineer',
  headline: 'Sr. Angular Developer crafting fast, scalable enterprise web apps.',
  summary:
    'I design, build and modernise web products — from layout to functionality — turning complex ERP, CRM and real-time dashboards into interfaces people actually enjoy using.',
  about: [
    'I specialise in designing, coding and modifying websites — from layout through to functionality — based on real client requirements. My focus is on building visually appealing, user-friendly and easy-to-navigate products.',
    'Over the last four years I have shipped enterprise-grade Angular applications for real estate, retail and POS, HR and payroll, warehousing, healthcare analytics and influencer marketing clients, working across the full stack with NestJS, Express and MongoDB when the product needs it.',
    'I care about performance budgets, reusable component libraries and clean state management with NgRx, and I am equally comfortable owning a feature end-to-end or plugging into an existing team.',
  ],
  location: 'Faisalabad, Pakistan',
  email: 'ar3435367@gmail.com',
  phone: '+92 317 7126 781',
  avatar: 'profile.jpg',
  resumeUrl: 'Abdul_Rehman.pdf',
  resumeFileName: 'Abdul-Rehman-CV.pdf',
  availability: 'Open to senior frontend roles & contracts',
  socials: [
    {
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/abdulrehman-a71545202/',
      icon: 'linkedin',
    },
    { label: 'Email', url: 'mailto:ar3435367@gmail.com', icon: 'mail' },
    { label: 'Call', url: 'tel:+923177126781', icon: 'phone' },
  ],
};

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'strengths', label: 'Strengths' },
  { id: 'contact', label: 'Contact' },
];

export const STATS: readonly Stat[] = [
  { value: '4+', label: 'Years building for the web' },
  { value: '9', label: 'Flagship products shipped' },
  { value: '25+', label: 'Technologies in daily use' },
  { value: '8', label: 'Industries shipped for' },
];

export const SKILL_GROUPS: readonly SkillGroup[] = [
  {
    title: 'Frontend Engineering',
    icon: 'code',
    description: 'Component architecture, state management and real-time UI at scale.',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'NgRx', 'RxJS', 'SignalR', 'Vibe Coding'],
  },
  {
    title: 'UI & Design Systems',
    icon: 'layers',
    description: 'Pixel-accurate, accessible interfaces built on reusable design tokens.',
    skills: [
      'SCSS',
      'Tailwind CSS',
      'PrimeNG',
      'Angular Material',
      'Kendo UI',
      'Syncfusion',
      'AG Grid',
      'PSD to HTML',
    ],
  },
  {
    title: 'Backend & APIs',
    icon: 'server',
    description: 'Typed services, documented contracts and pragmatic data modelling.',
    skills: ['NestJS', 'Express.js', 'REST APIs', 'JWT Auth', 'MongoDB', 'Mongoose', 'Swagger'],
  },
  {
    title: 'Product Domains',
    icon: 'briefcase',
    description: 'Business systems where workflow detail decides whether the product works.',
    skills: [
      'ERP',
      'CRM',
      'POS & Inventory',
      'HR & Payroll',
      'Warehouse Management',
      'Real Estate',
      'Dashboards & Reporting',
    ],
  },
];

export const EXPERIENCES: readonly Experience[] = [
  {
    role: 'Sr. Angular Developer',
    company: 'Xenex Media',
    period: '2024 — Present',
    current: true,
    description:
      'Xenex Media is a creative digital agency specialising in innovative web development, UI/UX design and custom software solutions, helping businesses grow through smart, user-focused technology and design.',
    highlights: [
      'Lead the frontend of client products, from wireframe hand-off to production release.',
      'Build reusable component and utility libraries that cut delivery time on new modules.',
      'Maintain and improve website speed with lazy loading, budgets and render tuning.',
      'Integrate third-party packages and APIs, and mentor developers on Angular patterns.',
    ],
    stack: ['Angular', 'TypeScript', 'NgRx', 'SCSS', 'Tailwind CSS', 'REST APIs'],
  },
  {
    role: 'Angular Developer',
    company: 'NCRA — National Center of Robotics and Automation',
    period: '2021 — 2023',
    current: false,
    description:
      'NCRA is a cutting-edge R&D consortium in Pakistan focused on advancing robotics, automation and AI. With specialised labs across top universities, it drives innovation, supports industrial automation and fosters indigenous technology development.',
    highlights: [
      'Built research and automation dashboards used by lab teams across partner universities.',
      'Translated complex robotics and sensor data into clear, real-time visual interfaces.',
      'Worked independently and inside cross-functional teams across parallel workstreams.',
      'Delivered systematically under changing R&D requirements and tight review cycles.',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'SignalR', 'Angular Material'],
  },
];

export const PROJECTS: readonly Project[] = [
  {
    title: 'FEC',
    role: 'Sr. Angular Developer',
    category: 'Real Estate',
    summary:
      'A real estate management platform covering property projects, listings, sales pipelines, requests, agencies and users. Its dashboard gives real-time insight into sales, revenue, inventory availability and project progress.',
    highlights: [
      'Real-time dashboard for sales, revenue and inventory availability',
      'Sales pipeline and request management across agencies and users',
      'Project performance tracking with role-aware listing management',
    ],
    stack: ['Angular', 'TypeScript', 'NgRx', 'REST APIs', 'SCSS', 'Charts'],
    accent: '#8b5cf6',
  },
  {
    title: 'YPM',
    role: 'Sr. Angular Developer',
    category: 'Real Estate',
    summary:
      'A web platform where users explore available property projects and manage their own from a centralised dashboard — project listings with property imagery, pricing, availability and full project detail for real estate teams.',
    highlights: [
      'Centralised dashboard for managing owned property projects',
      'Rich project listings with image galleries, pricing and availability',
      'Detail views built for fast day-to-day use by real estate teams',
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'Tailwind CSS', 'REST APIs'],
    accent: '#10b981',
  },
  {
    title: 'Multi-Branch Inventory & POS',
    role: 'Full-Stack Developer',
    category: 'Logistics',
    summary:
      'A multi-branch inventory and point-of-sale platform where every branch manages its own products, warehouse locations, customers and sales. Stock is tracked down to the exact bin, credit sales carry running customer balances, and receipts print on thermal hardware with scan-to-pay QR codes.',
    highlights: [
      'Bin-level stock tracking across branches, warehouses and locations',
      'Credit sales with running customer balances and settlement history',
      'Thermal receipt printing with scan-to-pay QR codes',
      'Angular 20 frontend on a NestJS 11 + MongoDB API documented with Swagger',
    ],
    stack: ['Angular 20', 'TypeScript 5.9', 'PrimeNG 20', 'NestJS 11', 'MongoDB', 'Swagger'],
    accent: '#14b8a6',
  },
  {
    title: 'HR Management & Payroll System',
    role: 'Angular Developer',
    category: 'Enterprise',
    summary:
      'An HR and payroll platform streamlining employee records, attendance, leave, payroll processing, onboarding, compensation and compliance workflows — with a role-based dashboard built for day-long use by HR teams.',
    highlights: [
      'Payroll processing alongside attendance, leave and compensation workflows',
      'Role-based access across onboarding, records and compliance modules',
      'Dense reporting with AG Grid / Kendo Grid and Chart.js, Highcharts and ng2-charts',
      'Client-side payslip and report export via jsPDF and html2canvas',
    ],
    stack: [
      'Angular 10',
      'TypeScript',
      'Kendo UI',
      'Syncfusion',
      'AG Grid',
      'Chart.js',
      'JWT Auth',
    ],
    accent: '#0ea5e9',
  },
  {
    title: 'MarketOgre',
    role: 'Angular Developer',
    category: 'Marketing & CRM',
    summary:
      'An influencer marketing and creator discovery platform where brands and agencies find influencers across social media, manage creator profiles and showcases, and run campaign requests, bids and conversations from authenticated dashboards.',
    highlights: [
      'Creator discovery and profile / showcase management across social platforms',
      'Campaign requests, bidding and messaging between brands and creators',
      'JWT-authenticated dashboards with CRM features on a REST API backend',
    ],
    stack: ['Angular 8', 'TypeScript', 'RxJS', 'Angular Material', 'Bootstrap 4', 'JWT'],
    accent: '#f43f5e',
  },
  {
    title: 'Real Estate Management System',
    role: 'Angular Developer',
    category: 'Real Estate',
    summary:
      'An online real estate platform managing the full operational cycle — properties, agencies, agents, clients and financial transactions — with comprehensive reporting for agency performance and better decision-making.',
    highlights: [
      'Property, agency and agent management modules with role-based access',
      'Financial transaction tracking and commission reporting',
      'Dashboards that surface agency performance and efficiency at a glance',
    ],
    stack: ['Angular', 'NgRx', 'REST APIs', 'PrimeNG', 'SCSS'],
    accent: '#6366f1',
  },
  {
    title: 'Outbreak AI',
    role: 'Angular Developer',
    category: 'AI & Data',
    summary:
      'A dynamic map of North America plotting live outbreak locations. Powered by artificial intelligence and real-time data mining, HealthMap detects disease outbreaks and issues timely alerts to support rapid public-health response.',
    highlights: [
      'Interactive geospatial map rendering thousands of live outbreak markers',
      'Real-time alerting pipeline wired into the UI for rapid response teams',
      'Data-mining results translated into readable trends and severity signals',
    ],
    stack: ['Angular', 'RxJS', 'SignalR', 'Mapping APIs', 'TypeScript'],
    accent: '#22d3ee',
  },
  {
    title: 'Warehouse Management System',
    role: 'Angular Developer',
    category: 'Logistics',
    summary:
      'A WMS controlling day-to-day warehouse operations: guiding inventory receiving and put-away, optimising order picking and shipping, and advising on inventory replenishment.',
    highlights: [
      'Receiving, put-away, picking and shipping workflows in one operational console',
      'Replenishment advice driven by live stock thresholds',
      'High-density data grids tuned for warehouse-floor speed',
    ],
    stack: ['Angular', 'NgRx', 'Angular Material', 'REST APIs', 'ERP'],
    accent: '#f59e0b',
  },
  {
    title: '640 Bourke',
    role: 'Angular Developer',
    category: 'Enterprise',
    summary:
      'A 68-storey Melbourne tower blending historic industrial context with the future of the city — 1, 2 and 3 bedroom residences, four levels of resident amenity, and the retained Eliza Tinsley Building at ground level.',
    highlights: [
      'Immersive marketing experience for residences and amenity levels',
      'Floor-plan and residence explorer with rich media handling',
      'Performance-tuned asset delivery for a visual-heavy build',
    ],
    stack: ['Angular', 'SCSS', 'Tailwind CSS', 'Animations', 'PSD to HTML'],
    accent: '#ec4899',
  },
];

export const PROFESSIONAL_SKILLS: readonly string[] = [
  'Maintaining and improving website speed',
  'Building reusable code and components for future use',
  'Working successfully in a team environment as well as independently',
  'Handling multiple tasks in parallel without dropping quality',
  'Working in a systematic, repeatable way',
  'Learning new tools and frameworks quickly',
  'Integrating third-party packages and services',
];

export const INTERESTS: readonly string[] = [
  'Outing & traveling',
  'Cricket, Snooker',
  'Internet browsing',
  'Social activity',
];

export const EDUCATION: readonly Education[] = [
  {
    institute: 'GC University Faisalabad',
    degree: 'BS (Computer Science)',
    detail: 'CGPA 3.4 / 4',
    period: 'Graduated',
  },
];

export const CONTACT_CHANNELS: readonly ContactChannel[] = [
  {
    label: 'Email',
    value: 'ar3435367@gmail.com',
    href: 'mailto:ar3435367@gmail.com',
    icon: 'mail',
  },
  { label: 'Phone', value: '+92 317 7126 781', href: 'tel:+923177126781', icon: 'phone' },
  {
    label: 'LinkedIn',
    value: '/in/abdulrehman-a71545202',
    href: 'https://www.linkedin.com/in/abdulrehman-a71545202/',
    icon: 'linkedin',
  },
];
