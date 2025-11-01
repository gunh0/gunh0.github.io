'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { PostData } from '@/lib/posts';
import styles from './page.module.css';

interface ArchiveClientProps {
  postsByYearMonth: Record<string, Record<string, PostData[]>>;
  years: string[];
  totalPosts: number;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ArchiveClient({ postsByYearMonth, years, totalPosts }: ArchiveClientProps) {
  const [searchQuery, setSearchQuery] = useState('');

  // 검색 필터링
  const filterPosts = (posts: PostData[]) => {
    if (!searchQuery.trim()) return posts;

    const query = searchQuery.toLowerCase();
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.description?.toLowerCase().includes(query) ||
        post.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  };

  // 검색 결과 계산
  const filteredPostsByYearMonth: Record<string, Record<string, PostData[]>> = {};
  let totalFiltered = 0;

  years.forEach((year) => {
    const months = Object.keys(postsByYearMonth[year]).sort((a, b) => b.localeCompare(a));
    
    months.forEach((month) => {
      const filtered = filterPosts(postsByYearMonth[year][month]);
      if (filtered.length > 0) {
        if (!filteredPostsByYearMonth[year]) {
          filteredPostsByYearMonth[year] = {};
        }
        filteredPostsByYearMonth[year][month] = filtered;
        totalFiltered += filtered.length;
      }
    });
  });

  const displayYears = Object.keys(filteredPostsByYearMonth).sort((a, b) => b.localeCompare(a));

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>📚 Archive</h1>
        <p className={styles.subtitle}>
          {searchQuery
            ? `Found ${totalFiltered} of ${totalPosts} posts`
            : `All ${totalPosts} posts in chronological order`}
        </p>
      </header>

      {/* 검색 바 */}
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search posts by title, description, or tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button onClick={() => setSearchQuery('')} className={styles.clearButton}>
            ✕
          </button>
        )}
      </div>

      {/* 연도-월별 포스트 */}
      {displayYears.length > 0 ? (
        displayYears.map((year) => {
          const months = Object.keys(filteredPostsByYearMonth[year]).sort((a, b) => b.localeCompare(a));
          const yearTotal = months.reduce((sum, month) => sum + filteredPostsByYearMonth[year][month].length, 0);

          return (
            <section key={year} id={year} className={styles.yearSection}>
              <h2 className={styles.yearTitle}>
                {year} <span className={styles.yearCount}>({yearTotal})</span>
              </h2>

              {months.map((month) => {
                const monthName = MONTH_NAMES[parseInt(month) - 1];
                const posts = filteredPostsByYearMonth[year][month];

                return (
                  <div key={`${year}-${month}`} className={styles.monthSection}>
                    <h3 className={styles.monthTitle}>
                      {monthName} <span className={styles.monthCount}>({posts.length})</span>
                    </h3>
                    <div className={styles.postsList}>
                      {posts.map((post) => {
                        const postDate = new Date(post.date);
                        const day = postDate.getDate().toString().padStart(2, '0');
                        
                        return (
                          <article key={post.slug} className={styles.postItem}>
                            <time className={styles.postDate} dateTime={post.date}>
                              {day}
                            </time>

                            <div className={styles.postContent}>
                              <Link href={`/posts/${post.slug}`} className={styles.postLink}>
                                {post.title}
                              </Link>

                              {post.description && (
                                <p className={styles.postDescription}>{post.description}</p>
                              )}

                              {post.tags && post.tags.length > 0 && (
                                <div className={styles.postTags}>
                                  {post.tags.map((tag) => (
                                    <span key={tag} className={styles.tag}>
                                      #{tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </section>
          );
        })
      ) : (
        <div className={styles.noResults}>
          <p>No posts found matching &quot;{searchQuery}&quot;</p>
          <button onClick={() => setSearchQuery('')} className={styles.resetButton}>
            Clear search
          </button>
        </div>
      )}

      {!searchQuery && (
        <div className={styles.stats}>
          <p className={styles.statsText}>
            Total <span className={styles.statsNumber}>{totalPosts}</span> posts published
          </p>
        </div>
      )}
    </div>
  );
}
