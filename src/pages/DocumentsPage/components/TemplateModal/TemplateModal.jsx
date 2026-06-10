import React from "react";
import styles from "../../DocumentsPage.module.css";

export default function TemplateModal({
  template,
  isFavorite,
  onClose,
  onToggleFavorite,
  onUse,
}) {
  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <img
          src={template.image}
          alt={template.title}
          className={styles.modalImg}
        />
        <div className={styles.modalBody}>
          <span className={styles.sectionBadge}>{template.section}</span>
          <h2 className={styles.modalTitle}>{template.title}</h2>
          <p className={styles.modalDesc}>{template.description}</p>

          <div>
            <div className={styles.metaSectionLabel}>Теги</div>
            <div className={styles.metaRow}>
              {template.tags.map((tag) => (
                <span key={tag} className={styles.tagBadge}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.metaInfo}>
            <div>
              <div className={styles.metaLabel}>Размер</div>
              <div className={styles.metaValue}>{template.size}</div>
            </div>
            <div>
              <div className={styles.metaLabel}>Формат</div>
              <div className={styles.metaValue}>DOCX</div>
            </div>
          </div>

          <div className={styles.modalActions}>
            <button className={styles.btnPrimaryLarge} onClick={onUse}>
              Использовать шаблон
            </button>
            <button className={styles.btnSecondary} onClick={onToggleFavorite}>
              {isFavorite ? "В избранном" : "В избранное"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
