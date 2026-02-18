
export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  duration: string;
  objectives?: string[];
  exercise?: {
    description: string;
    steps?: string[];
    code?: {
      title: string;
      content: string;
      key: string;
    };
  };
  deliverable?: string;
  note?: string;
  criteria?: string[];
  steps?: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  countLabel: string;
  lessons: Lesson[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tech: string[];
  impact?: string;
  problem?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  problem: string;
  solution: string;
  impact: string;
  tech: string[];
  category: 'Enterprise' | 'SaaS' | 'FinTech' | 'Logistics';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface EngagementModel {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  highlight: boolean;
}

export interface ClientStat {
  id: string;
  label: string;
  value: string;
  suffix: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
}
