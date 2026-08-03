import Fuse from "fuse.js";
import {
  ProjectSchema,
  Project,
  JournalFrontmatterSchema,
  JournalFrontmatter,
  JournalPost,
  CertificateSchema,
  Certificate,
  ExperienceSchema,
  Experience,
  TimelineItemSchema,
  TimelineItem,
  NowSchema,
  NowData,
  SettingsSchema,
  Settings,
  NavigationSchema,
  Navigation,
} from "./schemas";

export type {
  Project,
  JournalFrontmatter,
  JournalPost,
  Certificate,
  Experience,
  TimelineItem,
  NowData,
  Settings,
  Navigation,
};

// Static content imports from content/
import rymedsProject from "../content/projects/rymeds.json";
import etlabPlusProject from "../content/projects/etlab-plus.json";
import localAiProject from "../content/projects/local-ai-assistant.json";
import aiStudyCoachProject from "../content/projects/ai-study-coach.json";
import roboticsTelemetryProject from "../content/projects/robotics-telemetry.json";

import aiAwarenessCert from "../content/certificates/ai-awareness.json";
import matlabCert from "../content/certificates/matlab-onramp.json";
import nptelCert from "../content/certificates/nptel.json";
import ieeeCert from "../content/certificates/ieee.json";
import roboticsCert from "../content/certificates/robotics.json";
import nasscomCert from "../content/certificates/nasscom.json";

import roboticsInternshipExp from "../content/experience/robotics-internship.json";
import csUndergradExp from "../content/experience/cs-undergrad.json";

import timelineData from "../content/timeline.json";
import nowDataRaw from "../content/now.json";
import settingsDataRaw from "../content/settings.json";
import navigationDataRaw from "../content/navigation.json";

// Raw Journal Markdown Entries
const RAW_JOURNAL_POSTS: JournalPost[] = [
  {
    title: "Running LLMs Locally: Lessons in Quantization and Ollama Optimization",
    date: "2026-07-15",
    readingTime: 6,
    tags: ["Local AI", "Ollama", "Python", "Quantization", "FastAPI"],
    coverImage: "journal/local-llm.jpg",
    summary: "An in-depth technical analysis of CPU-bound quantization performance, evaluating Q4_K_M vs Q8_0 GGUF inference latency on host RAM.",
    featured: true,
    slug: "offline-llm-ollama",
    content: `# Context & Motivation

Cloud-based LLM APIs offer rapid responses, but introduce recurring token execution costs, network latency overhead, and privacy risks when processing proprietary codebase files.

## The Engineering Problem

Running full-precision FP16 models (such as LLaMA 3.1 8B requiring ~16GB VRAM) on standard laptop hardware leads to severe thrashing and out-of-memory crashes.

## Empirical Approach & Benchmark

We evaluated **GGUF 4-bit quantization (Q4_K_M)** using Ollama's C++ inference engine bound to a lightweight FastAPI proxy streaming tokens via **Server-Sent Events (SSE)**.

\`\`\`python
@app.post("/api/chat")
async def stream_chat(req: ChatRequest):
    async def event_generator():
        async for chunk in ollama_client.stream(req.prompt):
            yield f"data: {json.dumps({'token': chunk})}\\n\\n"
    return StreamingResponse(event_generator(), media_type="text/event-stream")
\`\`\`

### Performance Results Table

| Quantization Format | Memory Footprint | Token Generation Speed | Perception Latency |
| :--- | :--- | :--- | :--- |
| FP16 (Full Precision) | 16.2 GB | ~0.8 tokens/sec | Severe Thrashing |
| Q8_0 (8-bit) | 8.5 GB | ~3.2 tokens/sec | Acceptable |
| **Q4_K_M (4-bit)** | **4.7 GB** | **~8.5 tokens/sec** | **Instant Response** |

> **Key Lesson**: Memory bandwidth is the primary bottleneck for CPU-bound LLM inference, not raw compute capacity. Streamed token buffers prevent perception of latency.`,
  },
  {
    title: "Sensors, Signals & Noise: Filtering Telemetry during my IEEE Robotics Internship",
    date: "2026-06-10",
    readingTime: 8,
    tags: ["Robotics", "C++", "Sensors", "Arduino", "Embedded Systems"],
    coverImage: "journal/robotics.jpg",
    summary: "Debugging hardware sensor jitter during my robotics internship using C++ complementary filters to combine accelerometer and gyroscope data.",
    featured: true,
    slug: "robotics-internship-ieee",
    content: `# Context & IEEE Internship Background

During my robotics internship at **IEEE Sensors Council × Luminar Technolab**, I worked on telemetry signal extraction for mobile autonomous robots.

## The Technical Problem

Raw MPU-6050 IMU sensors exhibit high-frequency vibration noise from motor drives and low-frequency gyroscopic drift over extended operation runs.

## Sensor Complementary Filter Implementation

\`\`\`cpp
float ComplementaryFilter::update(float accelAngle, float gyroRate, float dt) {
  // High-pass filter for gyro + Low-pass filter for accel
  angle = alpha * (angle + gyroRate * dt) + (1.0f - alpha) * accelAngle;
  return angle;
}
\`\`\`

### Signal Filtering Results

- **Raw Accelerometer Jitter**: ±14.2 degrees spike under chassis motor vibration.
- **Filtered Complementary Angle**: ±0.8 degrees smooth tilt output.

> **Key Lesson**: Filtering noise at the sensor intake layer prevents exponential error accumulation in downstream navigation algorithms.`,
  },
  {
    title: "Multi-Tenant Isolation in PostgreSQL: Lessons from Building ETLab+",
    date: "2026-05-02",
    readingTime: 5,
    tags: ["PostgreSQL", "Database", "Security", "Full Stack", "Row-Level Security"],
    coverImage: "journal/etlab-postgresql.jpg",
    summary: "Architecting Row-Level Security (RLS) policies in PostgreSQL to enforce strict data isolation across college lab departments.",
    featured: true,
    slug: "lessons-etlab-plus",
    content: `# Context & Architecture Challenge

In building **ETLab+**, multiple academic departments (CS, EC, EEE) required access to shared laboratory facilities while enforcing strict row-level data segregation.

## PostgreSQL Row-Level Security Policy

\`\`\`sql
ALTER TABLE lab_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_policy ON lab_reservations
  USING (department_id = current_setting('app.current_department_id'));
\`\`\`

## Performance & Query Execution Results

By indexing \`(department_id, reservation_date)\` compound keys, query latency remained under 4ms across 10,000+ attendance records.

> **Key Lesson**: Enforcing security policies at the database engine level eliminates application-tier permission leaks and concurrency race conditions.`,
  },
  {
    title: "Why I Switched to Arch Linux: Minimalist Environments for Systems Engineering",
    date: "2026-03-20",
    readingTime: 4,
    tags: ["Linux", "Operating Systems", "DevOps", "Developer Tools"],
    coverImage: "journal/arch-linux.jpg",
    summary: "Configuring a minimal Linux development environment with zsh, Kitty, Neovim, and Ollama background process management.",
    featured: false,
    slug: "arch-linux-journey",
    content: `# Context & Developer Environment

Transitioned my primary development workspace to Arch Linux running custom kernel configuration parameters.

## Shell & Environment Configuration

\`\`\`bash
# Minimal Neovim alias & Ollama local daemon bind
alias vim="nvim"
alias ai-daemon="ollama serve --host 127.0.0.1:11434"
\`\`\`

> **Key Lesson**: A minimal development OS forces deep comprehension of process execution boundaries and system library dependencies.`,
  },
];

// Validate all JSON content at module load time with Zod
const ALL_PROJECTS: Project[] = [
  ProjectSchema.parse(rymedsProject),
  ProjectSchema.parse(etlabPlusProject),
  ProjectSchema.parse(localAiProject),
  ProjectSchema.parse(aiStudyCoachProject),
  ProjectSchema.parse(roboticsTelemetryProject),
];

const ALL_CERTIFICATES: Certificate[] = [
  CertificateSchema.parse(aiAwarenessCert),
  CertificateSchema.parse(matlabCert),
  CertificateSchema.parse(nptelCert),
  CertificateSchema.parse(ieeeCert),
  CertificateSchema.parse(roboticsCert),
  CertificateSchema.parse(nasscomCert),
];

const ALL_EXPERIENCE: Experience[] = [
  ExperienceSchema.parse(roboticsInternshipExp),
  ExperienceSchema.parse(csUndergradExp),
];

const ALL_TIMELINE: TimelineItem[] = timelineData.map((t) => TimelineItemSchema.parse(t));

const NOW_DATA: NowData = NowSchema.parse(nowDataRaw);
const SETTINGS_DATA: Settings = SettingsSchema.parse(settingsDataRaw);
const NAVIGATION_DATA: Navigation = NavigationSchema.parse(navigationDataRaw);

// 1. Projects API
export function getProjects(): Project[] {
  return ALL_PROJECTS.sort((a, b) => (a.featured === b.featured ? 0 : a.featured ? -1 : 1));
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | null {
  return getProjects().find((p) => p.slug === slug) || null;
}

// 2. Journal API
export function getJournalPosts(): JournalPost[] {
  return RAW_JOURNAL_POSTS.map((post) => {
    const parsedMeta = JournalFrontmatterSchema.parse({
      title: post.title,
      date: post.date,
      readingTime: post.readingTime,
      tags: post.tags,
      coverImage: post.coverImage,
      summary: post.summary,
      featured: post.featured,
    });
    return {
      ...parsedMeta,
      slug: post.slug,
      content: post.content,
    };
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getJournalPost(slug: string): JournalPost | null {
  return getJournalPosts().find((p) => p.slug === slug) || null;
}

// 3. Certificates API
export function getCertificates(): Certificate[] {
  return ALL_CERTIFICATES;
}

export function getFeaturedCertificates(): Certificate[] {
  return getCertificates().filter((c) => c.featured);
}

// 4. Experience API
export function getExperience(): Experience[] {
  return ALL_EXPERIENCE;
}

// 5. Timeline API
export function getTimeline(): TimelineItem[] {
  return ALL_TIMELINE;
}

// 6. Now API
export function getNow(): NowData {
  return NOW_DATA;
}

// 7. Settings API
export function getSettings(): Settings {
  return SETTINGS_DATA;
}

// 8. Navigation API
export function getNavigation(): Navigation {
  return NAVIGATION_DATA;
}

// 9. Fuse.js Indexed Search API
export function searchPlatformContent(query: string) {
  const projects = getProjects().map((p) => ({ ...p, type: "Project", link: `/projects/${p.slug}` }));
  const journal = getJournalPosts().map((j) => ({ ...j, type: "Journal", link: `/journal/${j.slug}` }));
  const certificates = getCertificates().map((c) => ({ ...c, type: "Certificate", link: "/certificates" }));

  const items = [...projects, ...journal, ...certificates];

  const fuse = new Fuse(items, {
    keys: ["title", "tagline", "summary", "description", "technologies", "tags", "category", "issuer"],
    threshold: 0.35,
  });

  return fuse.search(query).map((res) => res.item);
}
