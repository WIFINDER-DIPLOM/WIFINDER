// NotFoundPage.jsx
import React, { useEffect } from "react";
import styles from "./NotFoundPage.module.css";
import stylesBtn from "../../components/Buttons/MainButton/MainButton.module.css";

const NotFoundPage = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.accentShape} />

      <div className={styles.content}>
        <div className={styles.errorCode}>404</div>

        <h1 className={styles.title}>Страница не найдена</h1>

        <p className={styles.description}>
          Возможно, она была удалена или вы ввели неверный адрес.
        </p>

        <button
          onClick={handleGoBack}
          className={stylesBtn.Button}
          
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Вернуться назад
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
