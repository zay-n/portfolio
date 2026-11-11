/**
 * Single source of truth for all site content.
 * Everything here comes from the resume. Edit this file to update the site.
 * Optional fields (repo, live, period) are simply not rendered when left out.
 */

export const profile = {
  name: 'Muhammed Zayan Sameer',
  firstLine: 'Muhammed',
  secondLine: 'Zayan Sameer',
  shortName: 'Zayan Sameer',
  role: 'Problem solver',
  focus: ['CSE', 'IoT', 'Cybersecurity', 'Blockchain'],
  headline: 'I turn real-world problems into working software.',
  intro:
    'I’m a problem solver first and a programmer second. I love bringing ideas to life, and the ones I chase hardest are problems people actually face. I study Computer Science Engineering at P. A. College of Engineering, Mangalore, and build across web, mobile and hardware.',
  availability: 'Open to internships & graduate roles',
  classOf: 'Class of 2027',
  location: 'Kerala, India',
  email: 'zayy.cloudd@gmail.com',
  resumeFile: 'Muhammed-Zayan-Sameer-Resume.pdf',
  links: {
    github: 'https://github.com/zay-n',
    linkedin: 'https://www.linkedin.com/in/zaynx',
  },
} as const;

/** Real problems and what I built for each — cycled in the hero. */
export const solved = [
  { problem: 'Patient records out of reach during an emergency hospital transfer', built: 'ABEHA' },
  { problem: 'Railway crossings that nobody can predict', built: 'RailBro' },
  { problem: 'Stock and invoices for several companies, with different staff access', built: 'StockIT' },
  { problem: 'License keys tracked by hand in a spreadsheet', built: 'WinAuth' },
  { problem: 'Receipts printed and filed manually at the counter', built: 'WinSoft Print Station' },
  { problem: 'Crops watered on guesswork instead of soil data', built: 'Plynt' },
];

export const facts = [
  { value: '4×', label: '1st-place finishes', detail: 'CTF, blockchain, Java, national tech quiz' },
  { value: '60+', label: 'Workshop participants', detail: 'Hands-on sessions led at ICSB' },
  { value: '01', label: 'Published paper', detail: 'RailBro — ICEST 2025' },
  { value: '07', label: 'Projects built', detail: 'Web, mobile, desktop and hardware' },
];

export const about = {
  statement:
    'I’m more of a problem solver than a programmer. I love bringing ideas to life, and the ones I can’t leave alone are the real problems people face every day. Code is simply the fastest way I know to fix them.',
  paragraphs: [
    'I’m studying for a B.E. in Computer Science and Engineering at P. A. College of Engineering, Mangalore (2023–2027), in a programme built around IoT, cybersecurity and blockchain. I went to school in Sharjah and I’m based in Kerala.',
    'Almost everything I build starts with a problem somebody already has: a company tracking license keys in Excel, a counter handling receipts by hand, a hospital that can’t reach a patient’s records during a transfer. That has taken me across web (React, PHP), mobile (Flutter, Android), desktop (Python) and hardware (ESP8266).',
    'I also build communities. I co-founded ICSB, my college’s IoT, Cybersecurity and Blockchain club, where I serve as Vice President, and I was selected as the AWS Student Builder Group Leader for the college.',
  ],
  principles: [
    {
      title: 'Start from the real problem',
      body: 'A workflow someone already struggles with beats an idea looking for a user.',
    },
    {
      title: 'Prototype fast, then harden',
      body: 'Get something in front of people quickly, then add the roles, logs and checks that make it trustworthy.',
    },
    {
      title: 'Teach what I learn',
      body: 'If I can demo it live to a room, I understand it well enough to build on it.',
    },
  ],
  education: [
    {
      school: 'P. A. College of Engineering, Mangalore',
      detail: 'B.E. Computer Science and Engineering (IoT, Cybersecurity & Blockchain)',
      period: '2023 – 2027',
    },
    { school: 'Sharjah Indian School', detail: 'Schooling', period: '2009 – 2023' },
  ],
};

export type SkillGroup = { category: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    category: 'Languages',
    items: ['Python', 'Java', 'C', 'C++', 'JavaScript', 'PHP', 'SQL', 'Dart', 'HTML', 'CSS'],
  },
  { category: 'Frameworks', items: ['React', 'Vite', 'Flutter', 'Bootstrap', 'AJAX', 'Tkinter'] },
  { category: 'Databases', items: ['MySQL', 'Supabase', 'Firebase'] },
  { category: 'Cloud & DevOps', items: ['Google Cloud Fundamentals', 'Blynk Cloud', 'Git', 'GitHub'] },
  {
    category: 'Security, IoT & Web3',
    items: ['Cybersecurity', 'Kali Linux', 'VirtualBox', 'Blockchain', 'Arduino', 'ESP8266'],
  },
  { category: 'Design & Tools', items: ['Figma', 'LaTeX', 'Visual Studio Code'] },
];

/** Extra, resume-backed context shown in the skill inspector. */
export const skillNotes: Record<string, string> = {
  Java: '1st place — Java Coding Competition (ATM Simulation Challenge), 2024',
  C: 'C Training — IIT Bombay',
  Python: 'Python Basics — Infosys Springboard · Python 3.4 Training — IIT Bombay',
  Cybersecurity: '1st place — Capture The Flag competition, 2025',
  'Kali Linux': 'Taught in hands-on ICSB sessions',
  VirtualBox: 'Taught in hands-on ICSB sessions',
  Git: 'Introduction to Git — Coursera',
  'Google Cloud Fundamentals': 'Four Google Cloud courses completed',
  LaTeX: 'Introduction to LaTeX — GEO University',
};

export type FeaturedProject = {
  id: 'abeha' | 'railbro' | 'stockit';
  index: string;
  name: string;
  title: string;
  kind: string;
  period: string;
  role: string;
  summary: string;
  problem: string;
  solution: string;
  contribution: string;
  features: string[];
  stack: string[];
  /** Canonical skill names, used to cross-link the Skills section. */
  skills: string[];
  badge?: string;
  repo?: string;
  live?: string;
};

export const featuredProjects: FeaturedProject[] = [
  {
    id: 'abeha',
    index: '01',
    name: 'ABEHA',
    title: 'Aadhaar-based hospital access with blockchain consent and an emergency access layer',
    kind: 'Healthcare · Framework & architecture',
    period: 'Aug – Sep 2026',
    role: 'Project Initiator & Technical Lead',
    summary:
      'An AI-assisted, blockchain-enabled framework for emergency access to patient records and consent management, using IPFS and modelled on India’s ABDM architecture.',
    problem:
      'When a patient is transferred between hospitals in an emergency, their records are often unavailable to the team that needs them. The project began with that real-world gap.',
    solution:
      'An architecture that combines AI-assisted patient identity resolution, blockchain-based consent and audit management, and encrypted medical record storage on IPFS, with a dedicated emergency access workflow.',
    contribution:
      'I initiated the project and led its technical direction: system architecture, emergency access and consent workflows, interoperability concepts, feature definition and technology selection, aligned with ABDM.',
    features: [
      'AI-assisted patient identity resolution',
      'Blockchain consent and audit trail',
      'Encrypted record storage on IPFS',
      'Emergency access workflow',
      'ABDM-aligned interoperability',
    ],
    stack: ['AI', 'Blockchain', 'IPFS', 'Healthcare interoperability'],
    skills: ['Blockchain'],
    repo: 'https://github.com/zay-n/Abeha',
  },
  {
    id: 'railbro',
    index: '02',
    name: 'RailBro',
    title: 'Smart railway crossing and commuter assistance system',
    kind: 'Mobile · Prediction',
    period: 'Sep – Nov 2025',
    role: 'Project lead & developer',
    badge: 'Published · ICEST 2025',
    summary:
      'A cross-platform mobile app that predicts railway crossing status and helps commuters plan around it, with alerts, alternate routes and delay assistance.',
    problem:
      'A closed railway crossing is unpredictable lost time. Commuters usually find out its status only when they reach it.',
    solution:
      'A Flutter app backed by Firebase that predicts crossing status, alerts commuters, suggests alternate routes and helps with delays. The concept extends to commuter services such as taxi and auto booking and railway food ordering.',
    contribution:
      'I proposed and led the project and handled most of its lifecycle myself: system design, Flutter development, prediction logic, API and Firebase integration, and testing. The work was published as a research paper at ICEST 2025.',
    features: [
      'Crossing status prediction',
      'Commuter alerts',
      'Alternate routes',
      'Delay assistance',
      'Taxi and auto booking',
      'Railway food ordering',
    ],
    stack: ['Flutter', 'Firebase', 'APIs', 'Machine Learning'],
    skills: ['Flutter', 'Firebase', 'Dart'],
  },
  {
    id: 'stockit',
    index: '03',
    name: 'StockIT',
    title: 'Multi-tenant inventory and invoicing system',
    kind: 'Web platform · Analytics',
    period: '2025',
    role: 'Developer',
    summary:
      'An inventory and invoicing platform that serves multiple companies from one system, each with its own users, roles, stock and reporting.',
    problem:
      'Inventory, invoicing and credit tracking for several companies, each with staff who should see and do different things, on a single platform.',
    solution:
      'A multi-tenant PHP and MySQL application with four access levels, barcode-driven stock tracking, full transaction history, and dashboards that use ARIMA forecasting for predictive analytics.',
    contribution:
      'I built the platform: the multi-tenant data model, role-based access for Super Admin, Company Admin, Staff and Viewer users, the stock and invoicing workflows, and the forecasting dashboards.',
    features: [
      'Multi-tenant architecture',
      'Role-based access, four levels',
      'Stock tracking and barcode scanning',
      'Transaction history',
      'Credit and cash management',
      'ARIMA forecasting dashboards',
    ],
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'AJAX', 'Python', 'ARIMA'],
    skills: ['PHP', 'MySQL', 'Bootstrap', 'AJAX', 'Python', 'SQL', 'JavaScript'],
  },
];

export type IndexProject = {
  name: string;
  descriptor: string;
  year: string;
  summary: string;
  stack: string[];
  skills: string[];
  award?: string;
  repo?: string;
  live?: string;
};

export const moreProjects: IndexProject[] = [
  {
    name: 'WinSoft Print Station',
    descriptor: 'Automated receipt printing & archiving',
    year: '2026',
    summary:
      'An Android automation system that processes WinSoft transaction data, generates receipts and manages print queues for thermal and office printers. Google Drive handles file retrieval and archival, cutting out manual receipt handling.',
    stack: ['Android', 'Google Drive', 'CSV processing', 'Print queue'],
    skills: [],
    repo: 'https://github.com/zay-n/WinPrint',
  },
  {
    name: 'WinAuth',
    descriptor: 'License key automation dashboard',
    year: '2025',
    summary:
      'Replaced an Excel-based license key workflow with a cloud dashboard for employee requests and admin approval, with secure transaction logging, email notifications and admin controls for activation key generation.',
    stack: ['React', 'Vite', 'Supabase'],
    skills: ['React', 'Vite', 'Supabase', 'JavaScript'],
  },
  {
    name: 'Decentralized Voting System',
    descriptor: 'Blockchain voting',
    year: '2025',
    summary: 'A blockchain-based voting system, built for a blockchain project competition.',
    stack: ['Blockchain'],
    skills: ['Blockchain'],
    award: '1st place — Blockchain Project Competition',
  },
  {
    name: 'FIR Management System',
    descriptor: 'Decentralized application',
    year: '—',
    summary: 'A DApp for managing First Information Reports on a blockchain.',
    stack: ['Blockchain', 'DApp'],
    skills: ['Blockchain'],
  },
  {
    name: 'Plynt',
    descriptor: 'Smart irrigation IoT system',
    year: '2023',
    summary:
      'An irrigation system that waters automatically from real-time soil moisture readings, with cloud monitoring and a mobile app to control the DC pump.',
    stack: ['ESP8266', 'Soil moisture sensor', 'Blynk Cloud'],
    skills: ['ESP8266', 'Blynk Cloud', 'Arduino'],
    award: '2nd place — IoT Project Competition',
  },
  {
    name: 'AirZayM',
    descriptor: 'Airline reservation system',
    year: '2022',
    summary:
      'A desktop airline reservation system with a booking interface, email confirmations and automated PDF ticket generation. An early full-stack build that shaped how I approach UI and software design.',
    stack: ['Python', 'Tkinter', 'MySQL', 'Figma', 'ReportLab'],
    skills: ['Python', 'Tkinter', 'MySQL', 'Figma', 'SQL'],
  },
];

export type Role = {
  org: string;
  role: string;
  period?: string;
  context?: string;
  points: string[];
};

export const experience: Role[] = [
  {
    org: 'AWS Student Builder Group',
    role: 'Student Builder Group Leader',
    period: '2026 — Present',
    context: 'P. A. College of Engineering',
    points: [
      'Selected to lead student engagement, technical learning and cloud-focused activity within the college community.',
      'Promote hands-on exploration of AWS and cloud technologies through peer learning, technical sessions and community initiatives.',
      'Encourage students to build practical projects and explore cloud-based solutions through workshops, collaboration and mentoring.',
    ],
  },
  {
    org: 'ICSB PACE',
    role: 'Vice President & Founding Member',
    period: 'Sep 2024 — Present',
    context: 'IoT · Cybersecurity · Blockchain Club',
    points: [
      'Co-founded the college technical club and helped establish its identity, branding and student-facing community.',
      'Organized and led technical workshops on IoT, cybersecurity, blockchain and AI-driven innovation for 60+ participants.',
      'Ran practical sessions on VirtualBox, Kali Linux and social media phishing awareness using live demonstrations.',
      'Mentored students on AI-assisted development, rapid prototyping and frontend development through project-focused sessions.',
    ],
  },
  {
    org: 'Zaltech',
    role: 'Founder',
    points: ['A technology-oriented initiative I founded.'],
  },
];

export const publication = {
  title: 'RailBro — Smart Railway Crossing and Commuter Assistance System',
  venue: 'ICEST 2025',
  kind: 'Published research paper',
  summary:
    'Presents the proposed approach for railway crossing assistance and commuter support, based on the RailBro project.',
};

export const achievements = [
  {
    rank: '1st',
    title: 'National Level Intercollegiate Tech Quiz',
    detail: 'St. Aloysius Institute',
    date: 'Nov 2024',
  },
  {
    rank: '1st',
    title: 'Capture The Flag Competition',
    detail: 'Ethical hacking & cybersecurity',
    date: 'Apr 2025',
  },
  {
    rank: '1st',
    title: 'Blockchain Project Competition',
    detail: 'Decentralized Voting System',
    date: 'Aug 2025',
  },
  {
    rank: '1st',
    title: 'Java Coding Competition',
    detail: 'ATM Simulation Challenge',
    date: 'Sep 2024',
  },
  {
    rank: '2nd',
    title: 'IoT Project Competition',
    detail: 'Smart Classroom Automation',
    date: 'Oct 2024',
  },
];

export const certifications = [
  {
    issuer: 'Google Cloud',
    items: [
      'Introduction to Generative AI',
      'Create & Manage Cloud Resources',
      'Perform Foundational Data, ML, and AI Tasks',
      'Google Cloud Computing Foundations',
    ],
  },
  { issuer: 'Cisco Networking Academy', items: ['Networking Basics (Oct 2025)'] },
  { issuer: 'LetsUpgrade', items: ['Prompt Engineering Bootcamp (Oct 2025)'] },
  { issuer: 'HP Foundation', items: ['AI for Beginners (Sep 2025)'] },
  { issuer: 'Simplilearn', items: ['Introduction to Cyber Security (May 2025)'] },
  { issuer: 'IIT Bombay', items: ['C Training', 'Python 3.4 Training'] },
  { issuer: 'Infosys Springboard', items: ['Python Basics'] },
  { issuer: 'Coursera', items: ['Introduction to Git'] },
  { issuer: 'GEO University', items: ['Introduction to LaTeX (May 2025)'] },
];

export const beyond = [
  {
    label: 'Capture the flag',
    body: 'CTFs are where I practise thinking like the other side. I took 1st place in one in April 2025.',
  },
  {
    label: 'Teaching by demo',
    body: 'Live phishing-awareness demos and Kali Linux sessions at ICSB. People remember what they watched break.',
  },
  {
    label: 'Fast prototypes',
    body: 'AI-assisted development and rapid prototyping, to get an idea in front of people while it is still cheap to change.',
  },
  {
    label: 'Design first',
    body: 'I sketch in Figma before I write code. The interface is usually where the real requirements show up.',
  },
];

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'recognition', label: 'Recognition' },
  { id: 'contact', label: 'Contact' },
];

export const resumeHref = `${import.meta.env.BASE_URL}${profile.resumeFile}`;
