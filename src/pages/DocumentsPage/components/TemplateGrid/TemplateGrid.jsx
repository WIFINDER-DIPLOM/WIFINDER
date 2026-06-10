import React from "react";
import styles from "../../DocumentsPage.module.css";
import TemplateCard from "../TemplateCard/TemplateCard";

export default function TemplateGrid({
  templates,
  favorites,
  onToggleFavorite,
  onUse,
  onSelect,
}) {
  if (templates.length === 0) {
    return (
      <div className={styles.grid}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}></div>
          <div className={styles.emptyTitle}>Ничего не найдено</div>
          <div className={styles.emptyText}>
            Попробуйте изменить параметры поиска
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {templates.map((t, idx) => (
        <TemplateCard
          key={t.id}
          template={t}
          index={idx}
          isFavorite={favorites.includes(t.id)}
          onToggleFavorite={onToggleFavorite}
          onUse={onUse}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
