import Link from "next/link";
import { Arrow } from "@/components/portfolio";

export default function NotFound() {
  return <div className="inner-page missing-page"><p className="hero-eyebrow">404 · Page not found</p><h1>A loose end.</h1><p>This page isn’t here. There’s plenty still being built.</p><Link className="button" href="/projects">Explore projects<Arrow /></Link><Link className="text-link" href="/">Back home<Arrow /></Link></div>;
}
