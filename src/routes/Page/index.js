import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Relay, { withRelay } from 'decorators/withRelay';
import Link from 'react-router/lib/Link';
import Media from 'components/Media';
import styles from './Page.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/no-danger */
/* eslint-disable camelcase */

@withRelay({
  fragments: {
    page: () => Relay.QL`
      fragment on Page {
        id
        slug
        title {
          rendered
        }
        content {
          rendered
        }
        featured_media {
          ${Media.getFragment('media')}
        }
      }
    `,
  },
})
export default class Page extends Component {
  render() {
    const {
      page: {
        id,
        slug,
        title: { rendered: title },
        content: { rendered: content },
        featured_media,
      },
    } = this.props;

    return (
      <article className={styles.content}>
        <Helmet
          title={title}
          link={[{ rel: 'canonical', href: `https://highforthis.com/${slug}` }]}
        />
        <header>
          <h1 className={styles.title}>
            <Link to={`/post/${id}`} dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
        </header>
        {featured_media && <Media media={featured_media} crop={'large'} />}
        <section
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </article>
    );
  }
}
