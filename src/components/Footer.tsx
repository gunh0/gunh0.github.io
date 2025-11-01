import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.social}>
            <a href="https://github.com/gunh0" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              🐙
            </a>
            <a href="https://linkedin.com/in/gunh0902" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              💼
            </a>
            <a href="https://instagram.com/gunh0ya" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              📷
            </a>
          </div>
          
          <p className={styles.copyright}>
            © {new Date().getFullYear()} gunh0. Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
