'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { PostData } from '@/lib/posts';
import styles from './tags.module.css';

interface TagsClientProps {
  allPosts: PostData[];
  tagCount: Record<string, number>;
}

export default function TagsClient({ allPosts, tagCount }: TagsClientProps) {
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  const sortedTags = Object.entries(tagCount).sort((a, b) => b[1] - a[1]);
  const maxCount = Math.max(...sortedTags.map(([, count]) => count));

  // 선택된 태그로 필터링
  const filteredPosts = selectedTag
    ? allPosts.filter((post) => post.tags?.includes(selectedTag))
    : [];

  // 태그 크기 계산 (1-5 레벨)
  const getTagSize = (count: number) => {
    const ratio = count / maxCount;
    if (ratio >= 0.8) return 5;
    if (ratio >= 0.6) return 4;
    if (ratio >= 0.4) return 3;
    if (ratio >= 0.2) return 2;
    return 1;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🏷️ Tags</h1>
        <p className={styles.subtitle}>
          {selectedTag 
            ? `${filteredPosts.length} posts tagged with #${selectedTag}`
            : `Explore ${sortedTags.length} topics across ${allPosts.length} posts`
          }
        </p>
      </header>

      {/* 통계 카드 */}
      {!selectedTag && (
        <div className={styles.statsCards}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{sortedTags.length}</div>
            <div className={styles.statLabel}>Total Tags</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>{allPosts.length}</div>
            <div className={styles.statLabel}>Total Posts</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>#{sortedTags[0]?.[0]}</div>
            <div className={styles.statLabel}>Most Popular</div>
          </div>
        </div>
      )}

      {/* 선택된 태그 헤더 */}
      {selectedTag && (
        <div className={styles.selectedTagHeader}>
          <div className={styles.selectedTagInfo}>
            <span className={styles.selectedTagIcon}>#</span>
            <span className={styles.selectedTagName}>{selectedTag}</span>
            <span className={styles.selectedTagCount}>{filteredPosts.length} posts</span>
          </div>
          <Link href="/tags" className={styles.clearFilter}>
            ✕ Clear filter
          </Link>
        </div>
      )}

      {/* 태그 클라우드 */}
      <div className={styles.tagCloudSection}>
        <h2 className={styles.sectionTitle}>
          {selectedTag ? 'All Tags' : 'Tag Cloud'}
        </h2>
        <div className={styles.tagCloud}>
          {sortedTags.map(([tag, count]) => {
            const size = getTagSize(count);
            return (
              <Link
                key={tag}
                href={`/tags?tag=${encodeURIComponent(tag)}`}
                className={`${styles.tagBubble} ${styles[`size${size}`]} ${selectedTag === tag ? styles.active : ''}`}
                title={`${count} posts`}
              >
                <span className={styles.tagBubbleName}>#{tag}</span>
                <span className={styles.tagBubbleCount}>{count}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 필터링된 포스트 그리드 */}
      {selectedTag && filteredPosts.length > 0 && (
        <div className={styles.postsSection}>
          <h2 className={styles.sectionTitle}>Posts</h2>
          <div className={styles.postsGrid}>
            {filteredPosts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <Link href={`/posts/${post.slug}`} className={styles.postCardLink}>
                  <div className={styles.postCardHeader}>
                    <time className={styles.postCardDate} dateTime={post.date}>
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </time>
                  </div>

                  <h3 className={styles.postCardTitle}>{post.title}</h3>

                  {post.description && (
                    <p className={styles.postCardDescription}>{post.description}</p>
                  )}

                  {post.tags && post.tags.length > 1 && (
                    <div className={styles.postCardTags}>
                      {post.tags.filter(t => t !== selectedTag).slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.postCardTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
