import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { GitHubRepository } from "@/lib/github-model";
import { readmeLink } from "@/lib/github-model";

export function ProjectReadme({ markdown, repository }: { markdown: string; repository: GitHubRepository }) {
  return <div className="project-readme"><Markdown remarkPlugins={[remarkGfm]} skipHtml components={{
    h1: ({ children }) => <h3>{children}</h3>,
    h2: ({ children }) => <h3>{children}</h3>,
    h3: ({ children }) => <h4>{children}</h4>,
    h4: ({ children }) => <h4>{children}</h4>,
    h5: ({ children }) => <h4>{children}</h4>,
    h6: ({ children }) => <h4>{children}</h4>,
    a: ({ href, children, node }) => {
      const safe = readmeLink(href, repository);
      // Badges are already linked images: rendering the image as another link
      // would nest anchors, so keep its alt text in the original link instead.
      const image = node?.children.find(child => child.type === "element" && child.tagName === "img");
      const content = image?.type === "element" ? String(image.properties.alt || "Repository image") : children;
      return safe ? <a href={safe}>{content}</a> : <span>{content}</span>;
    },
    // README images are links, so third-party trackers and oversized assets never load.
    img: ({ src, alt }) => { const safe = typeof src === "string" ? readmeLink(src, repository) : undefined; return safe ? <a href={safe}>{alt || "View repository image"} ↗</a> : null; },
    table: ({ children }) => <div className="readme-table" role="region" aria-label="Repository documentation table" tabIndex={0}><table>{children}</table></div>,
    pre: ({ children }) => <pre role="region" aria-label="Repository code example" tabIndex={0}>{children}</pre>,
    input: ({ checked }) => <span aria-label={checked ? "Completed" : "Not completed"}>{checked ? "☑" : "☐"}</span>,
  }}>{markdown}</Markdown></div>;
}
