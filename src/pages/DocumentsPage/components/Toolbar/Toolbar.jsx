import React from "react";
import styles from "../../DocumentsPage.module.css";

export default function Toolbar({
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection,
  sections,
  favorites,
  favoritesCount,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Поиск шаблона, тега или раздела..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className={styles.tabs}>
        {sections.map((s) => (
          <button
            key={s}
            className={`${styles.tab} ${activeSection === s ? styles.tabActive : ""}`}
            onClick={() => setActiveSection(s)}
          >
            {s === "Избранное" ?  `${s} (${favoritesCount})` : s}
          </button>
        ))}
      </div>
    </div>
  );
}
