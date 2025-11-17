import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sidebar from '@/components/Sidebar';
import { getAllPosts } from '@/lib/posts';
import '@/styles/globals.css';
import 'katex/dist/katex.min.css';

export const metadata: Metadata = {
  title: "gunh0's Tech Blog",
  description: "gunh0's tech blog documenting web technology and security. Sharing learnings based on web technologies and experiences, with a focus on cybersecurity, cloud security automation, and building resilient systems.",
  authors: [{ name: 'gunh0' }],
  keywords: ['security', 'cybersecurity', 'cloud security', 'web development', 'tech blog'],
  icons: {
    icon: '/favicons/favicon.ico',
    apple: '/favicons/apple-touch-icon.png',
  },
  openGraph: {
    title: "gunh0's Tech Blog",
    description: 'Security Research Engineer passionate about Development and Cybersecurity',
    url: 'https://gunh0.github.io',
    siteName: "gunh0's Tech Blog",
    locale: 'en_US',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 사이드바 데이터 준비
  const allPosts = await getAllPosts();
  
  // 태그별 포스트 수
  const tagCount: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });
  const trendingTags = Object.entries(tagCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PYT1YZPL28"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-PYT1YZPL28');
            `,
          }}
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"
          integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <Header />
        <Sidebar trendingTags={trendingTags} />
        <main style={{ 
          minHeight: 'calc(100vh - 200px)',
          marginLeft: '280px',
          transition: 'margin-left 0.3s ease'
        }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
