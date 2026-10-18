import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageMotion } from "@/components/page-motion";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <><a className="skip-link" href="#main">Skip to content</a><div className="page-shell" id="top"><SiteHeader /><PageMotion /><main id="main" tabIndex={-1}>{children}</main><SiteFooter /></div></>;
}
