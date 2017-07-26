import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';
import { css } from 'glamor';

export default createFragmentContainer(
  ({ node, onEmbedClick = null, styles = {} }) => {
    const onClick = onEmbedClick ? onEmbedClick(node) : null;
    const className = styles ? css(styles.embed) : 'embed';
    const thumbnailUrl = node.thumbnailUrl.replace('hqdefault', 'maxresdefault');
    return (
      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
      <figure onClick={onClick} className={className}>
        <img src={thumbnailUrl} alt={node.title} />
        <figcaption>
          {node.title}
        </figcaption>
      </figure>
    );
  },
  graphql`
    fragment Embed_node on Embed {
      title
      thumbnailUrl
      html
      width
      height
    }
  `
);
