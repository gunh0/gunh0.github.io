import { Suspense } from 'react';
import { getAllPosts } from '@/lib/posts';
import TagsClient from './TagsClient';

export const metadata = {
  title: 'Tags | gunh0\'s Tech Blog',
  description: 'Browse posts by tags',
};

export default async function Tags() {
  const allPosts = await getAllPosts();
  
  const tagCount: Record<string, number> = {};
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
  });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TagsClient allPosts={allPosts} tagCount={tagCount} />
    </Suspense>
  );
}
