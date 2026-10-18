import Link from "next/link";
import { StructuredData } from "@/components/structured-data";
import { breadcrumbData } from "@/lib/seo";

export function PageHeading({ title, eyebrow, introduction, parent }: { title: string; eyebrow: string; introduction: string; parent?: { label: string; href: string } }) {
  return <header className="page-heading">
    <nav aria-label="Breadcrumb" className="breadcrumbs"><ol><li><Link href="/">Home</Link></li>{parent ? <li><Link href={parent.href}>{parent.label}</Link></li> : null}<li aria-current="page">{title}</li></ol></nav>
    <p className="hero-eyebrow">{eyebrow}</p><h1>{title}</h1><p className="page-lede">{introduction}</p>
  </header>;
}

export function PageBreadcrumbs({ title, path, parent }: { title: string; path: string; parent?: { label: string; href: string } }) {
  return <StructuredData data={breadcrumbData([{ label: "Home", href: "/" }, ...(parent ? [parent] : []), { label: title, href: path }])} />;
}
