import type { Metadata } from 'next';

const BASE_URL = 'https://noelbiju.com'; // Production domain fallback

export function constructMetadata({
  title = 'Noel Biju — Software Engineer',
  description = 'Building practical AI, robotics and developer tools. Software engineering portfolio focused on offline-first systems and local LLMs.',
  image = '/images/profile.jpg',
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type,
      url: BASE_URL,
      siteName: 'Noel Biju Portfolio',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@Ultra2021',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function generateJSONLD({
  name = 'Noel Biju',
  jobTitle = 'Software Engineer',
  description = 'CS Undergraduate focusing on offline AI, robotics, and developer tools.',
  url = BASE_URL,
}: {
  name?: string;
  jobTitle?: string;
  description?: string;
  url?: string;
} = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    jobTitle,
    description,
    url,
    sameAs: [
      'https://github.com/Ultra2021',
      'https://www.linkedin.com/in/noel-biju-788b81332',
    ],
    knowsAbout: [
      'Software Engineering',
      'Artificial Intelligence',
      'Local LLMs',
      'Robotics',
      'PostgreSQL',
      'FastAPI',
      'Linux',
    ],
  };
}
