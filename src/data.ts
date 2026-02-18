
import type { Module, Project, PortfolioItem, Service, EngagementModel, ClientStat, Testimonial } from './types';

export const MODULES: Module[] = [
  {
    id: 'module-1',
    title: 'Module 1 — Foundations',
    countLabel: '15 Days',
    description: 'Master core mental models of React. Cover JSX, components, props, state, events, effects, and context basics.',
    lessons: [
      {
        id: 'day-1',
        title: 'Day 1 — React 18 setup & Mental Model',
        subtitle: 'Vite setup, component tree, and StrictMode behavior.',
        tags: ['setup', 'vite', 'react18'],
        duration: '1 Day',
        objectives: [
          'Initialize a React 18 app with Vite',
          'Explain component -> props -> state -> render cycle',
          'Understand StrictMode double-invocation in dev'
        ],
        exercise: {
          description: 'Initialize with Vite and observe console logs in StrictMode.',
          code: {
            title: 'Vite Setup',
            content: 'npm create vite@latest react18-foundations -- --template react\ncd react18-foundations\nnpm install\nnpm run dev',
            key: 'vite-setup'
          }
        },
        deliverable: 'chore: bootstrap React 18 project + baseline App'
      },
      {
        id: 'day-2',
        title: 'Day 2 — JSX, expressions, lists, keys',
        subtitle: 'Render data from arrays; avoid key pitfalls; map patterns.',
        tags: ['jsx', 'lists', 'keys'],
        duration: '1 Day',
        exercise: {
          description: 'Build a FruitList component with a data array of objects.',
          code: {
            title: 'FruitList.jsx',
            content: 'export default function FruitList(){\n  const fruits = [\n    { id: \"a1\", name: \"Apple\", color: \"crimson\", seasonal: false },\n    { id: \"b2\", name: \"Mango\", color: \"goldenrod\", seasonal: true }\n  ];\n  return (\n    <ul>\n      {fruits.map(f => (\n        <li key={f.id} style={{color: f.color}}>{f.name}</li>\n      ))}\n    </ul>\n  );\n}',
            key: 'fruit-list'
          }
        }
      },
      {
        id: 'day-4',
        title: 'Day 4 — State with useState + events',
        subtitle: 'Update state safely; event handlers; derive UI from state.',
        tags: ['useState', 'events'],
        duration: '1 Day',
        exercise: {
          description: 'Implement counter with increment/decrement/reset.',
          code: {
            title: 'Counter.jsx',
            content: 'const [count, setCount] = useState(0);\nconst inc = () => setCount(c => c + 1);\nreturn <button onClick={inc}>{count}</button>;',
            key: 'counter'
          }
        }
      }
    ]
  },
  {
    id: 'module-2',
    title: 'Module 2 — Intermediate',
    countLabel: '20 Days',
    description: 'Learn about useReducer, hooks, performance, and routing. Build a simple Blog app.',
    lessons: [
      {
        id: 'day-16',
        title: 'Day 16 — useReducer patterns',
        subtitle: 'Actions, payloads, pure reducers; testing reducers directly.',
        tags: ['useReducer', 'state'],
        duration: '1 Day',
        exercise: {
          description: 'Write a reducer for a todo list and test it in isolation.'
        }
      },
      {
        id: 'day-17',
        title: 'Day 17 — useMemo / useCallback',
        subtitle: 'Stabilize props; memoize derived data; avoid premature optimization.',
        tags: ['performance', 'memo'],
        duration: '1 Day',
        exercise: {
          description: 'Optimize a large list filtering operation using useMemo.'
        }
      }
    ]
  },
  {
    id: 'module-3',
    title: 'Module 3 — Advanced',
    countLabel: '25 Days',
    description: 'Learn about Redux, performance, and testing. Build a Dashboard with roles.',
    lessons: [
      {
        id: 'day-36',
        title: 'Days 36–39 — State at Scale',
        subtitle: 'Redux Toolkit slices; Zustand stores; selectors.',
        tags: ['Redux', 'Zustand', 'Architecture'],
        duration: '4 Days',
        exercise: {
          description: 'Refactor the Blog app to use Redux Toolkit for state management.',
          code: {
            title: 'postsSlice.js',
            content: 'const postsSlice = createSlice({\n  name: \"posts\",\n  initialState: [],\n  reducers: { add: (state, action) => { state.push(action.payload); } }\n});',
            key: 'rtk-slice'
          }
        }
      }
    ]
  },
  {
    id: 'module-4',
    title: 'Module 4 — Expert',
    countLabel: '20 Days',
    description: 'Learn about security, Docker, and CI/CD. Build a full business app.',
    lessons: [
      {
        id: 'day-60',
        title: 'Days 60–63 — Deployment + Docker',
        subtitle: 'Build artifacts, env vars, Docker multi-stage build.',
        tags: ['Docker', 'Deploy'],
        duration: '4 Days',
        exercise: {
          description: 'Create a multi-stage Docker build for a React application.',
          code: {
            title: 'Dockerfile',
            content: 'FROM node:18-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html',
            key: 'dockerfile'
          }
        }
      }
    ]
  },
  {
    id: 'project-specs',
    title: 'Project Specifications',
    countLabel: '4 Specs',
    description: 'Real project plans for your portfolio. From simple to complex.',
    lessons: [
      {
        id: 'spec-1',
        title: 'Project 1 — Counter & Todo (Beginner)',
        subtitle: 'Focus on state and storage.',
        tags: ['Spec', 'Beginner'],
        duration: '5 Days',
        criteria: [
          'No state mutation',
          'Data saved in localStorage',
          'Has basic tests'
        ]
      },
      {
        id: 'spec-4',
        title: 'Project 4 — Full SaaS Capstone (Expert)',
        subtitle: 'A complete business app with login and roles.',
        tags: ['Spec', 'Expert'],
        duration: '15 Days',
        criteria: [
          'Role-based access control',
          'CI/CD pipeline included',
          'Optimized for speed'
        ]
      }
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'Business Dashboard',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1551288049-bbbda536ad85?q=80&w=2070&auto=format&fit=crop',
    description: 'A tool to manage business data.',
    tech: ['React', 'Next.js', 'Tailwind', 'PostgreSQL'],
    problem: "Teams could not see growth data in real-time.",
    impact: 'Work was finished 40% faster.'
  },
  {
    id: 'p2',
    title: 'Global Online Shop',
    category: 'Shopping',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
    description: 'A fast shop with global payments.',
    tech: ['Next.js', 'Stripe', 'MongoDB', 'AI Search'],
    problem: 'Sales were lost due to slow checkout.',
    impact: 'Sales went up by 25%.'
  },
  {
    id: 'p3',
    title: 'Admin Command Center',
    category: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop',
    description: 'Control company tools in one place.',
    tech: ['TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    problem: 'Internal tracking was slow and manual.',
    impact: 'Costs went down by 15%.'
  },
  {
    id: 'p4',
    title: 'Safe Health App',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    description: 'Private talk for doctors and patients.',
    tech: ['React', 'HIPAA Secure', 'Node.js', 'Prisma'],
    problem: "Health data was hard to access safely.",
    impact: '10,000 daily active users.'
  },
  {
    id: 'p5',
    title: 'Seller Marketplace',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
    description: 'A place where many people sell items.',
    tech: ['Next.js', 'Tailwind CSS', 'PostgreSQL', 'Redux'],
    problem: 'Small sellers could not list items online.',
    impact: '500 sellers joined fast.'
  },
  {
    id: 'p6',
    title: 'Fintech Dashboard',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1611974714851-eb6051612253?q=80&w=2070&auto=format&fit=crop',
    description: 'Track your money and investments safely.',
    tech: ['React', 'AI Analytics', 'AWS', 'WebSockets'],
    problem: 'Users needed one view for all assets.',
    impact: 'Users manage $50 million here.'
  },
  {
    id: 'p7',
    title: 'Cargo Tracking Site',
    category: 'Logistics',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop',
    description: 'Track cargo anywhere in real-time.',
    tech: ['Node.js', 'Google Maps API', 'MongoDB', 'IoT'],
    problem: 'Items were lost during shipping.',
    impact: 'Losses went down by 90%.'
  },
  {
    id: 'p8',
    title: 'Luxury Booking',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop',
    description: 'Easy booking for fancy hotels.',
    tech: ['React', 'PostgreSQL', 'Stripe', 'Redis'],
    problem: 'Booking errors made people unhappy.',
    impact: 'Always online, zero errors.'
  },
  {
    id: 'p9',
    title: 'Smart Work Helper',
    category: 'SaaS',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    description: 'A tool to help teams manage tasks.',
    tech: ['React', 'OpenAI API', 'Zustand', 'Prisma'],
    problem: 'Teams spent too much time on admin.',
    impact: 'Saved teams 10 hours a week.'
  },
  {
    id: 'p10',
    title: 'Corporate Portal',
    category: 'Enterprise',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop',
    description: 'A fast site for a shipping firm.',
    tech: ['Next.js', 'Tailwind', 'WordPress CMS', 'SEO'],
    problem: 'Old site was slow on mobile.',
    impact: 'Site rank went up by 60%.'
  }
];

export const EDUCATION = [
  {
    year: '2015 – 2018',
    institution: 'Kyambogo University',
    qualification: 'Bachelors of Information Technology',
    details: 'I studied how to build websites and computer networks. I focused on making systems safe and fast.'
  },
  {
    year: '2013 – 2014',
    institution: 'Iganga High School',
    qualification: 'High School Certificate',
    details: 'I finished high school with a focus on math and computer studies.'
  },
  {
    year: '2007 – 2011',
    institution: 'Green Fields High School',
    qualification: 'School Certificate',
    details: 'I learned the basics of science and drawing plans.'
  },
  {
    year: '2000 – 2006',
    institution: 'Bugabwe Primary School',
    qualification: 'Primary School Certificate',
    details: 'I started my school path and worked hard from the beginning.'
  }
];

export const TECH_STACK = [
  {
    title: 'Frontend Mastery',
    icon: 'Globe',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'jQuery', 'TypeScript']
  },
  {
    title: 'Backend Systems',
    icon: 'Cpu',
    skills: ['Node.js', 'PHP', 'Laravel', 'Express.js', 'REST APIs']
  },
  {
    title: 'Data & SQL',
    icon: 'Database',
    skills: ['SQL / MySQLi', 'PostgreSQL', 'MongoDB', 'Prisma', 'Mongoose']
  },
  {
    title: 'Ecosystem',
    icon: 'Layers',
    skills: ['Git / GitHub', 'Composer', 'Artisan', 'PHPMyAdmin', 'npm / yarn']
  },
  {
    title: 'CMS & Future',
    icon: 'Zap',
    skills: ['WordPress CMS', 'AI APIs', 'Machine Learning', 'Docker', 'CI/CD']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'CEO',
    company: 'TechFlow SaaS',
    text: 'Paul built our app very fast. It is safe and works better than anything else.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 't2',
    name: 'David Omondi',
    role: 'Product Lead',
    company: 'GlobalLogistics',
    text: 'His great work on our tracking system saved us lots of money. He is an expert.',
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: 't3',
    name: 'Linda Chen',
    role: 'Founder',
    company: 'EcoStore',
    text: 'Our sales went up by 40% after Paul fixed our shop. His work is top quality.',
    avatar: 'https://i.pravatar.cc/150?u=linda'
  },
  {
    id: 't4',
    name: 'Robert Kato',
    role: 'Operations Director',
    company: 'SwiftDeliver',
    text: 'The logistics dashboard Paul developed transformed our fleet management. Efficiency peaked instantly.',
    avatar: 'https://i.pravatar.cc/150?u=robert'
  },
  {
    id: 't5',
    name: 'Emily Nabirye',
    role: 'CTO',
    company: 'SecureHealth',
    text: 'Security was our main concern. Paul delivered a HIPAA-compliant app that is both robust and user-friendly.',
    avatar: 'https://i.pravatar.cc/150?u=emily'
  },
  {
    id: 't6',
    name: 'Jonathan Wright',
    role: 'Marketing Head',
    company: 'BrandPulse',
    text: 'Our landing page conversion jumped 50% after Paul optimized our site speed and UX. Brilliant work.',
    avatar: 'https://i.pravatar.cc/150?u=jonathan'
  },
  {
    id: 't7',
    name: 'Grace Akello',
    role: 'Product Designer',
    company: 'CreativeEdge',
    text: 'Collaborating with Paul is seamless. He translates complex design visions into pixel-perfect reality every time.',
    avatar: 'https://i.pravatar.cc/150?u=grace'
  },
  {
    id: 't8',
    name: 'Marcus Thorne',
    role: 'Managing Partner',
    company: 'BlueChip Finance',
    text: 'The fintech portal he built is world-class. Stable, fast, and highly intuitive for our high-net-worth clients.',
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    id: 't9',
    name: 'Sophia Mueller',
    role: 'E-commerce Manager',
    company: 'VogueStyles',
    text: 'Paul solved our checkout bottlenecks. Our abandoned cart rate dropped significantly. Highly recommended.',
    avatar: 'https://i.pravatar.cc/150?u=sophia'
  },
  {
    id: 't10',
    name: 'Ivan Semanda',
    role: 'Startup Founder',
    company: 'AgriTech Hub',
    text: 'Paul is more than a developer; he is a strategic partner. He understood our MVP needs perfectly.',
    avatar: 'https://i.pravatar.cc/150?u=ivan'
  }
];

export const CLIENT_STATS: ClientStat[] = [
  { id: 'st1', label: 'Apps Built', value: '50', suffix: '+' },
  { id: 'st2', label: 'Customer Growth', value: '45', suffix: '%' },
  { id: 'st3', label: 'Reliability', value: '99.9', suffix: '%' },
  { id: 'st4', label: 'Efficiency', value: '30', suffix: '%' }
];
