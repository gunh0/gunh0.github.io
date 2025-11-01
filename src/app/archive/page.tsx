import { getAllPosts } from '@/lib/posts';
import ArchiveClient from './ArchiveClient';

export const metadata = {
  title: 'Archive | gunh0\'s Tech Blog',
  description: 'All blog posts archive',
};

export default async function Archive() {
  const allPosts = await getAllPosts();

  // 연도-월별 그룹화
  const postsByYearMonth: Record<string, Record<string, typeof allPosts>> = {};
  
  allPosts.forEach((post) => {
    const year = post.date.substring(0, 4);
    const month = post.date.substring(5, 7);
    
    if (!postsByYearMonth[year]) {
      postsByYearMonth[year] = {};
    }
    if (!postsByYearMonth[year][month]) {
      postsByYearMonth[year][month] = [];
    }
    postsByYearMonth[year][month].push(post);
  });

  const years = Object.keys(postsByYearMonth).sort((a, b) => b.localeCompare(a));

  return <ArchiveClient postsByYearMonth={postsByYearMonth} years={years} totalPosts={allPosts.length} />;
}
