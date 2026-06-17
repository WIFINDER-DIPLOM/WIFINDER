import React from "react";
import styles from "./EmptyChat.module.css";

export default function EmptyChat() {
  return (
    <div className={styles["empty-chat"]}>
      <div className={styles["empty-chat-icon"]}>
        <svg viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
        </svg>
      </div>
      <h2>Выберите чат</h2>
      <p>Выберите диалог для начала общения</p>
    </div>
  );
}
