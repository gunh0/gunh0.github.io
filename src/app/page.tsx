import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import styles from './page.module.css';

export default async function Home() {
  const allPosts = await getAllPosts();
  const recentPosts = allPosts.slice(0, 6);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to gunh0&apos;s Tech Blog</h1>
        <p className={styles.heroDescription}>
          Security Research Engineer passionate about mastering the tools of Development and 
          the principles of Cybersecurity. Focusing on data-driven security, cloud security 
          automation, and building resilient systems that safeguard complex cloud environments.
        </p>
      </section>

      {/* 최근 포스트 카드 그리드 */}
      <section className={styles.postsSection}>
        <div className={styles.postsHeader}>
          <h2 className={styles.sectionTitle}>📝 Recent Posts</h2>
          <Link href="/archive" className={styles.viewAllLink}>
            View all posts →
          </Link>
        </div>
        
        <div className={styles.postsGrid}>
          {recentPosts.map((post) => (
            <article key={post.slug} className={styles.postCard}>
              <Link href={`/posts/${post.slug}`} className={styles.cardLink}>
                <div className={styles.cardContent}>
                  <div className={styles.cardHeader}>
                    <time className={styles.cardDate} dateTime={post.date}>
                      {format(new Date(post.date), 'MMM dd, yyyy')}
                    </time>
                  </div>
                  
                  <h3 className={styles.cardTitle}>{post.title}</h3>
                  
                  {post.description && (
                    <p className={styles.cardDescription}>{post.description}</p>
                  )}
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className={styles.cardTag}>
                          #{tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className={styles.cardTag}>+{post.tags.length - 3}</span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
