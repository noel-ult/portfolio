export type PortfolioLink = { label: string; url: string };
export type Project = {
  id: string;
  title: string;
  summary: string;
  problem?: string;
  contribution?: string;
  approach?: string;
  technologies?: string[];
  outcome?: string;
  status?: string;
  date?: string;
  links?: PortfolioLink[];
  preview?: "pageradar" | "choru-vaari";
  entryNote?: { thought: string; label?: string };
};
export type Experience = {
  id: string;
  role: string;
  organization: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  summary?: string;
  responsibilities?: string[];
  outcomes?: string[];
};
export type Portfolio = {
  publication: { contentApproved: boolean; hasPlaceholders: boolean };
  profile: {
    name: string;
    role: string;
    introduction: string;
    biography: string;
    location?: string;
    availability?: string;
    resumeUrl?: string;
    photo?: { src: string; alt: string };
  };
  skills: { category?: string; name: string; proficiency?: string }[];
  projects: Project[];
  experience: Experience[];
  education: {
    id: string;
    institution: string;
    qualification: string;
    startDate?: string;
    endDate?: string;
    focus?: string;
    link?: PortfolioLink;
  }[];
  achievements: {
    id: string;
    name: string;
    issuer?: string;
    date?: string;
    description?: string;
    verificationLink?: PortfolioLink;
  }[];
  contact: { invitation: string; email?: string; links: PortfolioLink[] };
};

// Profile facts come from Noel's supplied résumé; source links were checked on GitHub.
// The owner authorized publication to noel-ult/portfolio and Vercel.
// List projects strongest first; use ISO dates (YYYY-MM or YYYY-MM-DD).
export const portfolio: Portfolio = {
  publication: { contentApproved: true, hasPlaceholders: false },
  profile: {
    name: "Noel Biju",
    role: "Computer science student. Building software with AI.",
    introduction: "I build tools for studying, everyday workflows, and local AI. Curious about how systems work, I turn ideas into applications you can use.",
    biography: "I’m a computer science undergraduate at Sahrdaya College of Engineering & Technology, Kerala, graduating in 2028. My projects range from a study coach and an offline AI assistant to pharmacy and lab management tools. I’ve also explored sensor systems and hardware integration through an advanced robotics internship. I’m looking for opportunities to keep learning and build useful software.",
    location: "Kerala, India",
    availability: "Seeking software & AI internships",
    resumeUrl: "/documents/noel-biju-resume.pdf",
    photo: { src: "/profile/noel-biju.webp", alt: "Noel Biju outdoors in the mountains" },
  },
  skills: [
    { name: "C, C++, SQL & PL/SQL", category: "Languages" },
    { name: "HTML5 & CSS3", category: "Web" },
    { name: "Ollama, LLaMA & Mistral", category: "Local AI" },
    { name: "MATLAB", category: "Machine learning & deep learning" },
    { name: "Git, GitHub & PostgreSQL", category: "Tools" },
    { name: "Data structures, algorithms & databases", category: "Computer science" },
  ],
  projects: [
    {
      id: "pageradar", title: "PageRadar",
      entryNote: { thought: "Notice what changes" },
      summary: "Keep an eye on the pages that matter. PageRadar monitors public webpages and keeps a history of what changed.",
      problem: "Important updates to deadlines, pricing, or eligibility are easy to miss when you have to revisit every page yourself.",
      approach: "Scheduled checks save an initial snapshot, detect content changes, and record new snapshots in a watch’s history. A Next.js interface connects to a NestJS GraphQL API, with Prisma and PostgreSQL handling the records.",
      technologies: ["Next.js", "TypeScript", "NestJS", "GraphQL", "Prisma", "PostgreSQL"],
      links: [{ label: "View source on GitHub", url: "https://github.com/noel-ult/PageRadar" }],
      preview: "pageradar",
    },
    {
      id: "choru-vaari", title: "Choru Vaari Kodukkam",
      entryNote: { thought: "Experiment with everyday life", label: "Choru Vaari" },
      summary: "How many handfuls of rice are on your plate? A playful computer vision project gives a very serious answer to a very unserious question.",
      contribution: "Hand tracking, vaari estimation, and frontend. Built with Samuel Thomas C for TinkerHub Useless Projects.",
      approach: "MediaPipe hand landmarks estimate a personal handful capacity. Local Canvas image segmentation estimates the rice on a plate, and the calculator expresses it in vaaris. A built-in demo works without a webcam.",
      technologies: ["Next.js", "React", "TypeScript", "MediaPipe", "Canvas API", "Tailwind CSS"],
      links: [
        { label: "View source on GitHub", url: "https://github.com/noel-ult/chooru-varal" },
      ],
      preview: "choru-vaari",
    },
    {
      id: "ai-study-coach", title: "AI Study Coach",
      summary: "A study companion that turns session logs into personalized recommendations and a clearer picture of productivity.",
      approach: "Tracks study duration, focus, and difficulty through a Flask API and an Expo mobile interface. Rule-based analysis produces suggestions, while dashboards show study patterns over time.",
      technologies: ["Python", "Flask", "React Native", "Expo", "SQLite"],
      links: [{ label: "View source on GitHub", url: "https://github.com/noel-ult/AI-Study-Coach-" }],
    },
    {
      id: "local-ai-assistant", title: "Local AI Assistant",
      entryNote: { thought: "Explore local intelligence", label: "AI Buddy" },
      summary: "An offline assistant built around locally running language models, persistent conversation memory, and multiple chat sessions.",
      approach: "Uses Ollama to run models locally, with separate modules for the AI engine, conversation management, and memory. The project explores LLaMA and Mistral without depending on a cloud chat service.",
      technologies: ["Python", "Ollama", "LLaMA", "Mistral"],
      links: [{ label: "View source on GitHub", url: "https://github.com/noel-ult/AI_BUDDY" }],
    },
    {
      id: "etlab-plus", title: "ETLab+",
      summary: "A lab management tool for scheduling, experiment tracking, and student record submissions.",
      outcome: "Received the Best S3 Project Award.",
    },
    {
      id: "rymeds", title: "RyMeds",
      summary: "A pharmacy management system bringing inventory, billing, and sales records into one workflow.",
      approach: "Uses a relational database with create, read, update, and delete operations to manage pharmacy records.",
      outcome: "Received the Best S1 Project Award.",
    },
  ],
  experience: [{
    id: "robotics-internship", role: "Summer Intern — Advanced Robotics",
    organization: "IEEE Sensors Council Kerala Chapter × Luminar Technolab",
    startDate: "2026-06", endDate: "2026-06", location: "Kochi",
    summary: "Completed a two-week intensive internship covering sensor systems, hardware integration, and applied robotics fundamentals.",
  }],
  education: [{
    id: "btech", institution: "Sahrdaya College of Engineering & Technology, Kerala",
    qualification: "B.Tech in Computer Science", startDate: "2024", endDate: "2028",
    focus: "Currently pursuing my undergraduate degree.",
  }],
  achievements: [
    { id: "best-projects", name: "Two-time Best Project Award", description: "Best S1 Project for RyMeds and Best S3 Project for ETLab+." },
    { id: "mern", name: "Full Stack Development (MERN)", issuer: "ICT Academy Kerala" },
    { id: "matlab", name: "MATLAB for Machine Learning & Deep Learning", issuer: "IEEE / MathWorks", description: "Also completed MATLAB Onramp with a score of 100%." },
    { id: "ai-foundation", name: "AI Awareness & Foundation", issuer: "Intel & Dell — AI for Future Workforce" },
    { id: "tinkerhub", name: "TinkerHub Scholarship Recipient", issuer: "TinkerHub" },
  ],
  contact: {
    invitation: "Have an internship opportunity, a project idea, or something interesting to build? Let’s connect.",
    email: "noelbiju2552@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/noel-ult" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/noel-biju-788b81332" },
    ],
  },
};

export const previewCopy = {
  notice: "Preview / profile details pending",
  projectsTitle: "Your work, in detail.",
  projectsDescription: "Your selected work will appear here. Project details have not been supplied yet.",
  projectFiles: [
    { name: "project.md", content: "# [Project title]\n\nProject details pending.\n\n## Summary\n[Describe what this project does.]\n\n## Problem\n[The problem or need you addressed.]" },
    { name: "contribution.md", content: "# My contribution\n\n[Your role in the project.]\n\n## Implementation\n[What you personally built or contributed.]\n\n## Lessons\n[What you learned along the way.]" },
    { name: "stack.json", content: '{\n  "technologies": [],\n  "note": "Add the technologies used in your project."\n}' },
  ],
  experienceDescription: "Experience details pending. Your roles and contributions will appear here.",
  contactDescription: "Contact details pending. Your preferred way to get in touch will appear here.",
};
