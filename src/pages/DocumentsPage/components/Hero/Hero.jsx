import React from "react";
import styles from "../../DocumentsPage.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heroTitle}>Шаблоны документов</h1>
      <p className={styles.heroSub}>
        Готовые профессиональные шаблоны, разделённые по категориям. Выберите
        нужный, отредактируйте и используйте в один клик.
      </p>
    </section>
  );
}
