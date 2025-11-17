import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://gunh0.github.io';

function getAllPostSlugs() {
  const postsDirectory = path.join(__dirname, '../posts');
  const items = fs.readdirSync(postsDirectory);
  const slugs = [];

  items.forEach((item) => {
    const itemPath = path.join(postsDirectory, item);
    
    if (!fs.statSync(itemPath).isDirectory()) {
      return;
    }

    // Check if it's a year folder (4 digits)
    if (/^\d{4}$/.test(item)) {
      // Year-based structure: posts/2024/11-16-post-title/
      const yearFolders = fs.readdirSync(itemPath);
      yearFolders.forEach((folder) => {
        const folderPath = path.join(itemPath, folder);
        if (fs.statSync(folderPath).isDirectory()) {
          const files = fs.readdirSync(folderPath);
          const mdFile = files.find((file) => file.endsWith('.md'));
          if (mdFile) {
            const fullPath = path.join(folderPath, mdFile);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data } = matter(fileContents);
            
            slugs.push({
              slug: `${item}/${folder}`,
              date: data.date ? String(data.date) : '',
            });
          }
        }
      });
    } else {
      // Legacy structure: posts/post-title/
      const files = fs.readdirSync(itemPath);
      const mdFile = files.find((file) => file.endsWith('.md'));
      if (mdFile) {
        const fullPath = path.join(itemPath, mdFile);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data } = matter(fileContents);
        
        slugs.push({
          slug: item,
          date: data.date ? String(data.date) : '',
        });
      }
    }
  });

  return slugs;
}

function getAllPosts() {
  const posts = getAllPostSlugs();
  return posts.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB - dateA;
  });
}

function generateSitemap() {
  const posts = getAllPosts();
  const now = new Date().toISOString();

  const staticPages = [
    { url: `${SITE_URL}/`, priority: '1.0', changefreq: 'weekly' },
    { url: `${SITE_URL}/about/`, priority: '0.5', changefreq: 'weekly' },
    { url: `${SITE_URL}/archive/`, priority: '0.5', changefreq: 'weekly' },
    { url: `${SITE_URL}/tags/`, priority: '0.5', changefreq: 'weekly' },
  ];

  const postPages = posts.map(post => {
    const postDate = new Date(post.date);
    const currentDate = new Date();
    const lastModified = postDate > currentDate ? currentDate : postDate;
    
    return {
      url: `${SITE_URL}/posts/${post.slug}/`,
      priority: '0.8',
      changefreq: 'monthly',
      lastmod: lastModified.toISOString(),
    };
  });

  const allPages = [...staticPages, ...postPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    ${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : `<lastmod>${now}</lastmod>`}
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outDir = path.join(__dirname, '../out');
  
  if (!fs.existsSync(outDir)) {
    console.error('Error: out directory does not exist. Run "npm run build" first.');
    process.exit(1);
  }

  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully at out/sitemap.xml');
}

generateSitemap();
