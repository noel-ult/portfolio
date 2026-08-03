import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "@/components/providers";

// Geist font with fallback
const geist = localFont({
  src: [
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../node_modules/geist/dist/fonts/geist-sans/Geist-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist",
  display: "swap",
  fallback: ["Inter", "ui-sans-serif", "system-ui"],
});

const geistMono = localFont({
  src: [
    {
      path: "../node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

const siteUrl = "https://noelbiju.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noel Biju",
    template: "%s | Noel Biju",
  },
  description:
    "Software Engineer passionate about AI, Full Stack Development, Cloud, Cybersecurity and building products that solve real-world problems.",
  keywords: [
    "Noel Biju",
    "Software Engineer",
    "Full Stack Developer",
    "AI Engineer",
    "Next.js",
    "React",
    "Portfolio",
    "Cybersecurity",
    "Developer",
    "India",
  ],
  authors: [{ name: "Noel Biju", url: siteUrl }],
  creator: "Noel Biju",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Noel Biju",
    description:
      "Software Engineer building AI applications, full-stack products and developer tools.",
    siteName: "Noel Biju",
  },
  twitter: {
    card: "summary_large_image",
    title: "Noel Biju",
    description:
      "Software Engineer building AI applications, full-stack products and developer tools.",
    creator: "@noelbiju",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Noel Biju",
    url: siteUrl,
    occupation: "Software Engineer",
    jobTitle: "Software Engineer",
    description:
      "Software Engineer passionate about AI, Full Stack Development, Cloud, Cybersecurity and building products that solve real-world problems.",
    sameAs: [
      "https://github.com/Ultra2021",
      "https://www.linkedin.com/in/noel-biju-788b81332",
    ],
  };

  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "var(--font-geist), Inter, ui-sans-serif" }}>
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

