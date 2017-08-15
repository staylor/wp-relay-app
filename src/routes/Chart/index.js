import React from 'react';
import PropTypes from 'prop-types';
import { graphql, createFragmentContainer } from 'react-relay';
import { ArticleWrapper, Error } from 'wp-styled-components';
import { Title, List, Item, Image } from 'wp-styled-components/lib/Chart';

const Chart = ({ viewer: { chart } }) => {
  if (!chart) {
    return <Error />;
  }

  return (
    <ArticleWrapper>
      <header>
        <Title>
          <a href={chart.authorUri}>
            {chart.authorName}
          </a>
        </Title>
      </header>
      <List>
        {chart.items.map(({ title, url, artist, releaseDateFormatted, images }) =>
          <Item key={url}>
            {images.length && <Image src={images[0].url} alt="" />}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title} - {artist}
            </a>
            <p>
              <strong>Released:</strong> {releaseDateFormatted}
            </p>
          </Item>
        )}
      </List>
    </ArticleWrapper>
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
