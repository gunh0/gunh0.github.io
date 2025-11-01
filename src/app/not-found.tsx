import Link from 'next/link';
import styles from './posts/[...slug]/page.module.css';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>404 - Page Not Found</h1>
        </header>

        <div className={styles.content}>
          <p>Sorry, the page you are looking for does not exist.</p>
          <p>
            <Link href="/" className={styles.backLink}>
              ← Go back to Home
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
}
