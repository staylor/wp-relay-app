import React from 'react';
import Form from './Form';
import Walker from './Walker';
import styles from './Comments.scss';

/* eslint-disable react/prop-types */

export default function Comments({ comments }) {
  return (
    <aside className={styles.comments}>
      <h3>Comments</h3>
      <section>
        <Form />
        <Walker comments={comments} />
      </section>
    </aside>
  );
}
