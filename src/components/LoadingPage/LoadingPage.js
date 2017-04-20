import React from 'react';
import Loading from '../Loading';
import styles from './LoadingPage.scss';

export default function LoadingPage() {
  return (
    <div className={styles.loadingPage}>
      <Loading />
    </div>
  );
}
