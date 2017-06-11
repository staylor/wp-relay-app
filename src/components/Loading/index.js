import React from 'react';
import styles from './Loading.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.activity} />
    </div>
  );
}
