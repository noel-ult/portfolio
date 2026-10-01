import type { Metadata } from "next";
import { portfolio } from "@/content/portfolio";
import { canIndex, isPreview } from "@/lib/content";
import { siteUrl } from "@/lib/site";
import "@fontsource/barlow-condensed/800.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "./globals.css";

// This runs while the document is parsed, before the visible page can paint.
// The CSS gate only exists when this script can run; no-JS visitors see the page.
const entryBootstrap = `(function () {
  const html = document.documentElement;
  try {
    let seen = false;
    try { seen = sessionStorage.getItem('line-of-thought-entry-v1') === 'seen'; } catch (error) {}
    const replay = new URLSearchParams(location.search).get('intro') === '1';
    const navigation = performance.getEntriesByType('navigation')[0];
    if (location.pathname !== '/' || location.hash || document.hidden || (seen && !replay) ||
        (navigation && navigation.type === 'back_forward') ||
        matchMedia('(prefers-reduced-motion: reduce)').matches ||
        matchMedia('(forced-colors: active)').matches) return;

    html.dataset.entry = 'boot';
    function release(remember) {
      if (html.dataset.entry !== 'boot') return;
      delete html.dataset.entry;
      delete html.dataset.entryRequested;
      if (remember) try { sessionStorage.setItem('line-of-thought-entry-v1', 'seen'); } catch (error) {}
    }
    function requestEntry() {
      if (html.dataset.entry !== 'boot' || html.dataset.entryRequested) return;
      html.dataset.entryRequested = 'true';
      // A tap made before hydration is replayed when the entrance becomes ready.
      // If the bundle fails, the page still becomes available.
      setTimeout(function () { release(true); }, 5000);
    }
    let pointer = null;
    document.addEventListener('pointerdown', function (event) {
      if (html.dataset.entry === 'boot' && event.isPrimary)
        pointer = [event.pointerId, event.clientX, event.clientY];
    }, { capture: true });
    document.addEventListener('pointerup', function (event) {
      if (pointer && pointer[0] === event.pointerId &&
          Math.hypot(event.clientX - pointer[1], event.clientY - pointer[2]) < 8) requestEntry();
      pointer = null;
    }, { capture: true });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') requestEntry();
      if (event.key === 'Escape') release(true);
    }, { capture: true });
    addEventListener('wheel', function () { release(false); }, { passive: true });
    addEventListener('scroll', function () { release(false); }, { passive: true });
    addEventListener('pageshow', function (event) { if (event.persisted) release(false); });
    document.addEventListener('visibilitychange', function () { if (document.hidden) release(false); });
    setTimeout(function () { release(false); }, 10000);
  } catch (error) { delete html.dataset.entry; }
})();`;
const entryCriticalCss = `.entry-intro{display:none}html[data-entry="boot"] .entry-intro,html[data-entry="active"] .entry-intro{display:block;position:fixed;inset:0;z-index:40;color:#eeeae4}html[data-entry="boot"] .entry-intro{background:#090909}html[data-entry="active"] .entry-intro{background:transparent}html[data-entry="boot"] .entry-intro[hidden],html[data-entry="active"] .entry-intro[hidden]{display:none}`;

const title = isPreview ? "Portfolio — preview" : `${portfolio.profile.name} — Software & AI Portfolio`;
const description = isPreview ? "A personal portfolio preview. Owner information and selected work are awaiting review." : portfolio.profile.introduction;

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  authors: [{ name: portfolio.profile.name }],
  alternates: { canonical: "/" },
  robots: { index: canIndex, follow: canIndex },
  ...(canIndex ? {
    openGraph: {
      title, description, type: "website", url: "/", siteName: "Noel Biju",
      ...(portfolio.profile.photo ? { images: [{ url: portfolio.profile.photo.src, width: 1200, height: 1600, alt: portfolio.profile.photo.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(portfolio.profile.photo ? { images: [portfolio.profile.photo.src] } : {}) },
  } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><style dangerouslySetInnerHTML={{ __html: entryCriticalCss }} /><script dangerouslySetInnerHTML={{ __html: entryBootstrap }} /></head><body>{children}</body></html>;
}
