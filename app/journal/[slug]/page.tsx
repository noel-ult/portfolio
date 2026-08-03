import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJournalPosts, getJournalPost } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { RelatedContent } from "@/components/ui/RelatedContent";
import { constructMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  const posts = getJournalPosts();
  return posts.map((j) => ({
    slug: j.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getJournalPost(slug);
  if (!article) return constructMetadata({ title: "Entry Not Found" });
  return constructMetadata({
    title: `${article.title} — Engineering Journal`,
    description: article.summary,
    type: "article",
  });
}

export default async function JournalEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = getJournalPosts();
  const currentIndex = posts.findIndex((j) => j.slug === slug);
  const article = posts[currentIndex];

  if (!article) {
    notFound();
  }

  const prevArticle = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextArticle = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20">
        <div className="container-wide max-w-3xl space-y-12">
          {/* Back link */}
          <div>
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-white transition-colors font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Engineering Journal
            </Link>
          </div>

          {/* Header */}
          <div className="space-y-4 border-b border-[#27272A] pb-8">
            <div className="flex items-center gap-3 text-xs text-[#52525B] font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                {article.readingTime} min read
              </span>
              <span>·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-[#A1A1AA] leading-relaxed">
              {article.summary}
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags.map((tag) => (
                <span key={tag} className="tag text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Render Markdown Content */}
          <div className="prose prose-invert max-w-none space-y-6 text-[#A1A1AA] leading-relaxed font-sans border-b border-[#27272A] pb-12">
            <div className="whitespace-pre-wrap font-sans text-sm sm:text-base space-y-4 leading-relaxed">
              {article.content}
            </div>
          </div>

          {/* Previous / Next Article Navigation */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {prevArticle ? (
              <Link
                href={`/journal/${prevArticle.slug}`}
                className="card p-4 space-y-1 hover:border-[#3B82F6] transition-colors group"
              >
                <span className="text-[10px] font-mono text-[#52525B] uppercase block">← Previous Article</span>
                <span className="text-xs font-bold text-white group-hover:text-[#3B82F6] transition-colors line-clamp-1">
                  {prevArticle.title}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextArticle && (
              <Link
                href={`/journal/${nextArticle.slug}`}
                className="card p-4 space-y-1 hover:border-[#3B82F6] transition-colors text-right group ml-auto w-full"
              >
                <span className="text-[10px] font-mono text-[#52525B] uppercase block">Next Article →</span>
                <span className="text-xs font-bold text-white group-hover:text-[#3B82F6] transition-colors line-clamp-1">
                  {nextArticle.title}
                </span>
              </Link>
            )}
          </div>

          {/* Related Content Recommendations */}
          <RelatedContent currentSlug={article.slug} />
        </div>
      </main>
      <Footer />
    </>
  );
}
