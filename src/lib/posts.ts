import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostData {
  slug: string;
  title: string;
  date: string;
  tags?: string[];
  description?: string;
  content: string;
}

export function getAllPostSlugs() {
  const items = fs.readdirSync(postsDirectory);
  const slugs: string[] = [];

  items.forEach((item) => {
    const itemPath = path.join(postsDirectory, item);
    
    if (!fs.statSync(itemPath).isDirectory()) {
      return;
    }

    // 연도 폴더인지 확인 (4자리 숫자)
    if (/^\d{4}$/.test(item)) {
      // 연도별 구조: posts/2024/11-16-post-title/
      const yearFolders = fs.readdirSync(itemPath);
      yearFolders.forEach((folder) => {
        const folderPath = path.join(itemPath, folder);
        if (fs.statSync(folderPath).isDirectory()) {
          const files = fs.readdirSync(folderPath);
          const mdFile = files.find((file) => file.endsWith('.md'));
          if (mdFile) {
            slugs.push(`${item}/${folder}`);
          }
        }
      });
    } else {
      // 기존 구조: posts/post-title/
      const files = fs.readdirSync(itemPath);
      const mdFile = files.find((file) => file.endsWith('.md'));
      if (mdFile) {
        slugs.push(item);
      }
    }
  });

  return slugs;
}

export async function getPostData(slug: string): Promise<PostData> {
  if (!slug) {
    throw new Error('Slug is required');
  }

  const folderPath = path.join(postsDirectory, slug);
  
  if (!fs.existsSync(folderPath)) {
    throw new Error(`Folder not found: ${slug}`);
  }

  const files = fs.readdirSync(folderPath);
  const mdFile = files.find((file) => file.endsWith('.md'));
  
  if (!mdFile) {
    throw new Error(`No markdown file found in ${slug}`);
  }

  const fullPath = path.join(folderPath, mdFile);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeKatex)
    .use(rehypeStringify)
    .process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    title: data.title || '',
    date: data.date ? String(data.date) : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    description: data.description ? String(data.description) : '',
    content: contentHtml,
  };
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostData(slug))
  );

  return posts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
