import { portfolio, type PortfolioLink } from "@/content/portfolio";

export function safeUrl(value?: string): string | undefined {
  if (!value || value !== value.trim() || /[\s\\<>]/.test(value)) return;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const parsed = new URL(value);
    if (parsed.protocol === "https:" && !parsed.username && !parsed.password) return value;
  } catch { /* Missing and malformed destinations are not rendered. */ }
}

export function validLinks(links: PortfolioLink[] = []) {
  return links.filter((link) => link.label.trim() && safeUrl(link.url));
}

export function emailUrl(email?: string) {
  return email && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
    ? `mailto:${encodeURIComponent(email)}` : undefined;
}

export const isPreview = portfolio.publication.hasPlaceholders;
export const canIndex = portfolio.publication.contentApproved && !isPreview &&
  !/\[Your[^\]]*\]/i.test(JSON.stringify(portfolio));

export function chronological<T extends { startDate?: string; endDate?: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (!a.startDate || !b.startDate) return a.startDate ? -1 : b.startDate ? 1 : 0;
    return b.startDate.localeCompare(a.startDate);
  });
}

export function dateRange(start?: string, end?: string) {
  const displayDate = (value: string) => {
    const parts = /^(\d{4})-(\d{2})$/.exec(value);
    if (!parts) return value;
    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(parts[2]) - 1];
    return month ? `${month} ${parts[1]}` : value;
  };
  if (!start) return end ? displayDate(end) : "";
  if (!end || end === start) return displayDate(start);
  return `${displayDate(start)} — ${displayDate(end)}`;
}
