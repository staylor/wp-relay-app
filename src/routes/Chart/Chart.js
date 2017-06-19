import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import Error from 'components/Error';
import styles from './Chart.scss';

const Chart = ({ viewer: { chart } }) => {
  if (!chart) {
    return <Error />;
  }

  return (
    <article className={styles.content}>
      <header>
        <h1 className={styles.title}>
          <a href={chart.authorUri}>{chart.authorName}</a>
        </h1>
      </header>
      <ol className={styles.list}>
        {chart.items.map(({ title, url, artist, releaseDateFormatted, images }) =>
          <li key={url} className={styles.item}>
            {images.length && <img src={images[0].url} alt="" className={styles.image} />}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title} - {artist}
            </a>
            <p><strong>Released:</strong> {releaseDateFormatted}</p>
          </li>
        )}
      </ol>
    </article>
  );
};

Chart.propTypes = {
  viewer: PropTypes.shape({
    chart: PropTypes.object,
  }).isRequired,
};

export default createFragmentContainer(
  Chart,
  graphql`
    fragment Chart_viewer on Viewer {
      chart {
        title
        copyright
        updated
        authorName
        authorUri
        items {
          title
          artist
          releaseDate
          releaseDateFormatted
          url
          copyright
          images {
            url
            height
          }
        }
      }
    }
  `
);
