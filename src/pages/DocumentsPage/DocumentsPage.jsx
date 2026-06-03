import styles from "./DocumentsPage.module.css"

const DocumentsPage = () => {
  return (
    <>
      <div className={styles["btn-back"]}onClick={() => window.history.back()}>
        <svg viewBox="0 0 24 24">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </div>
      <div>
        <p>Hello, DocumentsPage</p>
      </div>
    </>
  );
};

export default DocumentsPage;
