import journalData from '@/data/journal.json';

export async function GET() {
  const baseUrl = 'https://noelbiju.com';

  const itemsXml = journalData
    .map(
      (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${baseUrl}/journal/${article.slug}</link>
      <guid>${baseUrl}/journal/${article.slug}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.excerpt}]]></description>
    </item>`
    )
    .join('');

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Noel Biju — Engineering Journal</title>
    <link>${baseUrl}</link>
    <description>Technical notes on offline AI, systems architecture, robotics, and software engineering.</description>
    <language>en</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
