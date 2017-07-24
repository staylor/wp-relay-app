import React from 'react';
import { css } from 'glamor';
import styles from './styles';

export default function Error() {
  return (
    <article>
      <header>
        <h1 className={css(styles.title)}>Not Found</h1>
      </header>
      <section>
        <p>Sorry not sorry.</p>
      </section>
    </article>
  );
}
