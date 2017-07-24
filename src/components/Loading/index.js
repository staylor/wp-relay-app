import React from 'react';
import { css } from 'glamor';
import styles from './styles';

export default function Loading() {
  return (
    <div className={css(styles.loading)}>
      <div className={css(styles.activity)} />
    </div>
  );
}
