import React from "react";
import styles from "../../DocumentsPage.module.css";

export default function Notification({ message }) {
  return (
    <div className={styles.notification}>
      <span className={styles.notificationIcon}>✓</span>
      {message}
    </div>
  );
}
