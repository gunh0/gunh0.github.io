'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  trendingTags: [string, number][];
}

export default function Sidebar({ trendingTags }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* 모바일 토글 버튼 */}
      <button 
        className={styles.toggleButton}
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <span className={styles.toggleIcon}>☰</span>
      </button>

      {/* 오버레이 */}
      <div 
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={closeSidebar}
      />

      {/* 사이드바 */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.sidebarContent}>
          {/* 네비게이션 */}
          <nav className={styles.section}>
            <h3 className={styles.sectionTitle}>Navigation</h3>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link 
                  href="/" 
                  className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
                  onClick={closeSidebar}
                >
                  <span className={styles.navIcon}>🏠</span>
                  Home
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  href="/archive" 
                  className={`${styles.navLink} ${pathname === '/archive' ? styles.active : ''}`}
                  onClick={closeSidebar}
                >
                  <span className={styles.navIcon}>📚</span>
                  Archive
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  href="/tags" 
                  className={`${styles.navLink} ${pathname === '/tags' ? styles.active : ''}`}
                  onClick={closeSidebar}
                >
                  <span className={styles.navIcon}>🏷️</span>
                  Tags
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link 
                  href="/about" 
                  className={`${styles.navLink} ${pathname === '/about' ? styles.active : ''}`}
                  onClick={closeSidebar}
                >
                  <span className={styles.navIcon}>👤</span>
                  About
                </Link>
              </li>
            </ul>
          </nav>

          {/* 트렌딩 태그 */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>🔥 Trending Topics</h3>
            <ul className={styles.trendingList}>
              {trendingTags.map(([tag, count]) => (
                <li key={tag} className={styles.trendingItem}>
                  <Link 
                    href={`/tags?tag=${encodeURIComponent(tag)}`} 
                    className={styles.trendingLink}
                    onClick={closeSidebar}
                  >
                    <div className={styles.trendingTag}>
                      <span className={styles.tagIcon}>#</span>
                      <span className={styles.tagName}>{tag}</span>
                    </div>
                    <span className={styles.tagCount}>{count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>


        </div>
      </aside>
    </>
  );
}
