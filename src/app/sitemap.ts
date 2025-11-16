import { getAllPosts } from '@/lib/posts';

export const dynamic = 'force-static';

export default async function sitemap() {
  const posts = await getAllPosts();
  
  const postUrls = posts.map((post) => {
    const postDate = new Date(post.date);
    const now = new Date();
    // Prevent future dates in sitemap
    const lastModified = postDate > now ? now : postDate;
    
    return {
      url: `https://gunh0.github.io/posts/${post.slug}/`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    };
  });

  const routes = ['', '/about', '/archive', '/tags'].map((route) => ({
    url: `https://gunh0.github.io${route}${route ? '/' : ''}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.5,
  }));

  return [...routes, ...postUrls];
}
