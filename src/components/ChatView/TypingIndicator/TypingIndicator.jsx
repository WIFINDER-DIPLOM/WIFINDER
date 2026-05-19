import React from 'react';
import styles from './TypingIndicator.module.css';

export default function TypingIndicator() {
  return (
    <div className={styles['typing-indicator']}>
      <div className={styles['typing-dot']} />
      <div className={styles['typing-dot']} />
      <div className={styles['typing-dot']} />
      <span className={styles.label}>печатает...</span>
    </div>
  );
}