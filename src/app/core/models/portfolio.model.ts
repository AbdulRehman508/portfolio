export interface SocialLink {
  readonly label: string;
  readonly url: string;
  readonly icon: 'linkedin' | 'github' | 'mail' | 'phone' | 'whatsapp';
}

export interface Profile {
  readonly name: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly role: string;
  readonly headline: string;
  readonly summary: string;
  readonly about: readonly string[];
  readonly location: string;
  readonly email: string;
  readonly phone: string;
  readonly avatar: string;
  readonly resumeUrl: string;
  readonly resumeFileName: string;
  readonly availability: string;
  readonly socials: readonly SocialLink[];
}

export interface Stat {
  readonly value: string;
  readonly label: string;
}

export interface SkillGroup {
  readonly title: string;
  readonly icon: string;
  readonly description: string;
  readonly skills: readonly string[];
}

export interface Experience {
  readonly role: string;
  readonly company: string;
  readonly period: string;
  readonly current: boolean;
  readonly description: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
}

export type ProjectCategory = 'Enterprise' | 'AI & Data' | 'Real Estate' | 'Logistics';

export interface Project {
  readonly title: string;
  readonly role: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  readonly highlights: readonly string[];
  readonly stack: readonly string[];
  readonly accent: string;
}

export interface Education {
  readonly institute: string;
  readonly degree: string;
  readonly detail: string;
  readonly period: string;
}

export interface ContactChannel {
  readonly label: string;
  readonly value: string;
  readonly href: string;
  readonly icon: SocialLink['icon'];
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
}
