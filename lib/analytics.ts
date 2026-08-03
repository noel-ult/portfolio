// Client-side analytics tracker for tracking portfolio engagement

export type AnalyticsEvent = 
  | 'view_project'
  | 'view_journal'
  | 'view_certificate'
  | 'download_resume'
  | 'click_github'
  | 'search_query';

interface AnalyticsRecord {
  event: AnalyticsEvent;
  target: string;
  timestamp: number;
}

const STORAGE_KEY = 'portfolio_analytics_events';

export function trackEvent(event: AnalyticsEvent, target: string) {
  if (typeof window === 'undefined') return;
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as AnalyticsRecord[];
    const newRecord: AnalyticsRecord = {
      event,
      target,
      timestamp: Date.now(),
    };
    existing.push(newRecord);
    // Keep max 200 records locally
    if (existing.length > 200) existing.shift();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    // Fail silently in private/restricted storage
  }
}

export function getTopEngagement(): { mostViewedProject?: string; totalResumeDownloads: number; totalGithubClicks: number } {
  if (typeof window === 'undefined') return { totalResumeDownloads: 0, totalGithubClicks: 0 };
  try {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as AnalyticsRecord[];
    const projectCounts: Record<string, number> = {};
    let resumeDownloads = 0;
    let githubClicks = 0;

    records.forEach((r) => {
      if (r.event === 'view_project') {
        projectCounts[r.target] = (projectCounts[r.target] || 0) + 1;
      } else if (r.event === 'download_resume') {
        resumeDownloads++;
      } else if (r.event === 'click_github') {
        githubClicks++;
      }
    });

    const sortedProjects = Object.entries(projectCounts).sort(([, a], [, b]) => b - a);
    return {
      mostViewedProject: sortedProjects[0]?.[0],
      totalResumeDownloads: resumeDownloads,
      totalGithubClicks: githubClicks,
    };
  } catch (err) {
    return { totalResumeDownloads: 0, totalGithubClicks: 0 };
  }
}
