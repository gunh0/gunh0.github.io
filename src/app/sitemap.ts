import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default async function sitemap() {
  const posts = await getAllPosts();
  
  const postUrls = posts.map((post) => ({
    url: `https://gunh0.github.io/posts/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const routes = ['', '/about', '/archive', '/tags'].map((route) => ({
    url: `https://gunh0.github.io${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  return [...routes, ...postUrls];
}
