import Link from "next/link";
import { Arrow } from "@/components/portfolio";

export function SiteFooter() {
  return <footer className="site-footer">
    <p>© {new Date().getFullYear()} Noel Biju</p>
    <div className="footer-links"><Link className="text-link" href="/enter">Replay entrance<Arrow /></Link><Link className="text-link" href="/contact">Let’s talk<Arrow /></Link><a className="text-link" href="#top">Back to top<Arrow direction="up" /></a></div>
  </footer>;
}
