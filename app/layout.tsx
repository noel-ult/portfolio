import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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

const siteUrl = "https://noelbiju.dev";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Noel Biju — Software Developer & CS Undergrad",
    template: "%s | Noel Biju",
  },
  description:
    "Computer Science undergraduate building offline AI systems, robotics tools, and practical software that solves real problems.",
  keywords: [
    "Noel Biju",
    "Software Developer",
    "Machine Learning",
    "Robotics",
    "Offline LLM",
    "Ollama",
    "FastAPI",
    "React",
    "Next.js",
    "Kerala",
    "India",
  ],
  authors: [{ name: "Noel Biju", url: siteUrl }],
  creator: "Noel Biju",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Noel Biju — Software Developer & CS Undergrad",
    description:
      "Computer Science undergraduate building offline AI systems, robotics applications, and developer tools.",
    siteName: "Noel Biju",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Noel Biju — Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Noel Biju — Software Developer & CS Undergrad",
    description:
      "CS undergraduate building offline AI, robotics applications, and practical tools.",
    images: ["/og-image.png"],
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
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Noel Biju",
              url: siteUrl,
              jobTitle: "AI Engineer & Software Developer",
              description:
                "Computer Science undergraduate specializing in AI engineering, offline LLM systems, and robotics.",
              sameAs: [
                "https://github.com/Ultra2021",
                "https://www.linkedin.com/in/noel-biju-788b81332",
              ],
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased" style={{ fontFamily: "var(--font-geist), Inter, ui-sans-serif" }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
