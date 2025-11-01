import Link from 'next/link';
import { getAllPostSlugs, getPostData } from '@/lib/posts';
import { format } from 'date-fns';
import styles from './page.module.css';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.split('/'),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const fullSlug = slug.join('/');
  const post = await getPostData(fullSlug);
  return {
    title: `${post.title} | gunh0's Tech Blog`,
    description: post.description || post.title,
  };
}

export default async function Post({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const fullSlug = slug.join('/');
  const post = await getPostData(fullSlug);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to Home
      </Link>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <time className={styles.date} dateTime={post.date}>
              📅 {format(new Date(post.date), 'MMMM dd, yyyy')}
            </time>
            
            {post.tags && post.tags.length > 0 && (
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </div>
  );
}
