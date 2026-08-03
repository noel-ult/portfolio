import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string(),
  slug: z.string(),
  tagline: z.string(),
  description: z.string(),
  featured: z.boolean().default(false),
  status: z.string().default("Completed"),
  year: z.string(),
  category: z.string(),
  github: z.string().optional().default(""),
  demo: z.string().optional().default(""),
  coverImage: z.string().optional().default(""),
  screenshots: z.array(z.object({
    title: z.string(),
    caption: z.string(),
    type: z.string().default("code")
  })).optional().default([]),
  technologies: z.array(z.string()).default([]),
  architecture: z.array(z.string()).optional().default([]),
  database: z.array(z.string()).optional().default([]),
  apiEndpoints: z.array(z.string()).optional().default([]),
  folderStructure: z.array(z.string()).optional().default([]),
  timeline: z.array(z.string()).optional().default([]),
  challenges: z.array(z.string()).optional().default([]),
  lessons: z.array(z.string()).optional().default([]),
  futureImprovements: z.array(z.string()).optional().default([]),
  relatedProjects: z.array(z.string()).optional().default([])
});

export type Project = z.infer<typeof ProjectSchema>;

export const JournalFrontmatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  readingTime: z.number().or(z.string()),
  tags: z.array(z.string()).default([]),
  coverImage: z.string().optional().default(""),
  summary: z.string(),
  featured: z.boolean().default(false),
});

export type JournalFrontmatter = z.infer<typeof JournalFrontmatterSchema>;

export interface JournalPost extends JournalFrontmatter {
  slug: string;
  content: string;
}

export const CertificateSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  category: z.string(),
  issueDate: z.string(),
  credentialId: z.string(),
  verificationUrl: z.string().optional().default(""),
  image: z.string().optional().default(""),
  description: z.string(),
  featured: z.boolean().default(false)
});

export type Certificate = z.infer<typeof CertificateSchema>;

export const ExperienceSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional().default(""),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string(),
  type: z.string().optional().default("Experience"),
  skills: z.array(z.string()).default([]),
  achievements: z.array(z.string()).default([]),
  images: z.array(z.string()).default([]),
  projects: z.array(z.string()).default([])
});

export type Experience = z.infer<typeof ExperienceSchema>;

export const TimelineItemSchema = z.object({
  year: z.string(),
  title: z.string(),
  description: z.string(),
  icon: z.string().optional().default(""),
  relatedProject: z.string().nullable().optional(),
  relatedJournal: z.string().nullable().optional(),
  relatedCertificate: z.string().nullable().optional()
});

export type TimelineItem = z.infer<typeof TimelineItemSchema>;

export const NowSchema = z.object({
  currentlyBuilding: z.array(z.string()),
  currentlyLearning: z.array(z.string()),
  currentlyReading: z.array(z.string()),
  currentExperiment: z.string(),
  currentGoal: z.string(),
  currentFocus: z.string(),
  playlist: z.array(z.string()),
  hardware: z.array(z.string()),
  software: z.array(z.string()),
  lastUpdated: z.string(),
  timezone: z.string().optional().default("IST (UTC+5:30)"),
  responseTime: z.string().optional().default("Within 24 Hours"),
  availableFor: z.string().optional().default("Collaborations"),
  portfolioVersion: z.string().optional().default("v2.4.0-production"),
  lastPortfolioUpdate: z.string().optional().default("August 2026"),
  devSetup: z.object({
    os: z.string(),
    editor: z.string(),
    terminal: z.string(),
    shell: z.string(),
    aiWorkflow: z.string()
  }).optional()
});

export type NowData = z.infer<typeof NowSchema>;

export const SettingsSchema = z.object({
  name: z.string(),
  role: z.string(),
  email: z.string(),
  github: z.string(),
  linkedin: z.string(),
  resume: z.string(),
  website: z.string(),
  location: z.string(),
  seo: z.object({
    defaultTitle: z.string(),
    defaultDescription: z.string(),
    ogImage: z.string()
  }),
  theme: z.object({
    default: z.string(),
    accentColor: z.string()
  }),
  analytics: z.object({
    enabled: z.boolean()
  }),
  socialLinks: z.record(z.string(), z.string())
});

export type Settings = z.infer<typeof SettingsSchema>;

export const NavigationSchema = z.object({
  items: z.array(z.object({
    label: z.string(),
    href: z.string(),
    icon: z.string().optional(),
    external: z.boolean().optional().default(false)
  }))
});

export type Navigation = z.infer<typeof NavigationSchema>;
