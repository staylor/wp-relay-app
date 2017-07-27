import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { routerShape } from 'found/lib/PropTypes';
import { css } from 'glamor';
import FragmentContainer from 'decorators/FragmentContainer';
import Media from 'components/Media';
import ContentNode from 'components/ContentNode';
import { dateRegex } from 'utils/regex';
import PostLink from './PostLink';
import styles from './styles';

/* eslint-disable react/no-danger */

@FragmentContainer(graphql`
  fragment Post_post on Post {
    id
    date
    content {
      data {
        __typename
        ...ContentNode_content
      }
    }
    excerpt {
      raw
    }
    featuredMedia {
      ...Media_media
    }
    ...PostLink_post
  }
`)
export default class Post extends Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      content: PropTypes.object,
      excerpt: PropTypes.object,
      featuredMedia: PropTypes.object,
    }).isRequired,
  };

  static contextTypes = {
    router: routerShape.isRequired,
  };

  onEmbedClick = () => e => {
    e.preventDefault();

    const { id, date } = this.props.post;
    const [, year, month, day] = dateRegex.exec(date);
    const url = `/${year}/${month}/${day}/${id}`;

    this.context.router.push(url);
  };

  render() {
    const { content: { data: content }, excerpt, featuredMedia } = this.props.post;
    const isEmbed = content && content.length && content[0].__typename === 'Embed';

    return (
      <article className={css(styles.post)}>
        <header>
          <h1 className={css(styles.title)}>
            <PostLink post={this.props.post} />
          </h1>
        </header>
        {featuredMedia &&
          <PostLink post={this.props.post}>
            <Media media={featuredMedia} />
          </PostLink>}
        {isEmbed
          ? <ContentNode
              component={'section'}
              styles={styles}
              className={css(styles.content)}
              content={content}
              onEmbedClick={this.onEmbedClick}
            />
          : <section className={css(styles.content)}>
              {excerpt.raw}
            </section>}
      </article>
    );
  }
}
