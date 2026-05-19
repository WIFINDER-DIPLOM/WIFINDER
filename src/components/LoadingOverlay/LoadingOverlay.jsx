import React from 'react';
import styles from './LoadingOverlay.module.css';

export default function LoadingOverlay() {
  return (
    <div className={styles['loading-overlay']}>
      <div className={styles.spinner} />
    </div>
  );
}