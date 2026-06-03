import React from 'react';
import styles from '../../DocumentsPage.module.css';

export default function TemplateCard({
  template,
  index,
  isFavorite,
  onToggleFavorite,
  onUse,
  onSelect,
}) {
  const tagsWord =
    template.tags.length === 1
      ? ''
      : template.tags.length < 5
      ? 'а'
      : 'ов';

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => onSelect(template)}
    >
      <img
        src={template.image}
        alt={template.title}
        className={styles.cardImg}
        loading="lazy"
      />
      <button
        className={`${styles.favBtn} ${isFavorite ? styles.favBtnActive : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(template.id);
        }}
        aria-label="В избранное"
      >
        {isFavorite ? '♥' : '♡'}
      </button>
      <div className={styles.cardBody}>
        <span className={styles.sectionBadge}>{template.section}</span>
        <h3 className={styles.cardTitle}>{template.title}</h3>
        <p className={styles.cardDesc}>{template.description}</p>
        <div className={styles.cardFooter}>
          <span className={styles.sizeText}>
            {template.size} · {template.tags.length} тег{tagsWord}
          </span>
          <button
            className={`${styles.btnPrimary} ${styles.useBtn}`}
            onClick={(e) => {
              e.stopPropagation();
              onUse(template);
            }}
          >
            Использовать
          </button>
        </div>
      </div>
    </article>
  );
}