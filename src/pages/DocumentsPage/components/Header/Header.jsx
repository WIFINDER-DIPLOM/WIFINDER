import React from 'react';
import styles from '../../DocumentsPage.module.css';

export default function Header({ favoritesCount }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <div className={styles.logoDot}>W</div>
        <span>Документы</span>
      </div>
      <nav className={styles.nav}>
        <span className={styles.navItem}>Библиотека</span>
        <span className={styles.navItem}>Избранное ({favoritesCount})</span>
        <span className={styles.navItem}>История</span>
        <span className={styles.navItem}>Настройки</span>
      </nav>
    </header>
  );
}