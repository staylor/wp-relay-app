import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Relay, { withRelay } from 'decorators/withRelay';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import styles from './App.scss';

/* eslint-disable react/prop-types */
/* eslint-disable react/prefer-stateless-function */

@withRelay({
  fragments: {
    categories: () => Relay.QL`
      fragment on CategoryCollection {
        ${Header.getFragment('categories')}
      }
    `,
    sidebar: () => Relay.QL`
      fragment on Sidebar {
        ${Sidebar.getFragment('sidebar')}
      }
    `,
  },
})
export default class App extends Component {

  render() {
    const {
      children,
      categories,
      sidebar,
    } = this.props;

    return (
      <div className={styles.page}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          title="Music as it happens."
          titleTemplate="%s - High for This"
          defaultTitle="High for This"
          meta={[
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
            { 'http-equiv': 'Content-Language', content: 'en' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          ]}
          script={[
            { src: '//use.typekit.net/tts4dcv.js', type: 'text/javascript' },
            { innerHTML: 'try{Typekit.load();}catch(e){}', type: 'text/javascript' },
          ]}
          link={[
            { id: 'favicon', rel: 'shortcut icon', href: '/kyt-favicon.png', sizes: '16x16 32x32', type: 'image/png' },
            { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css' },
          ]}
        />
        <Header categories={categories} />
        <div className={styles.content}>
          <section className={styles.primary}>
            {children}
          </section>
          <section className={styles.secondary}>
            <Sidebar sidebar={sidebar} />
          </section>
        </div>
        <footer className={styles.footerCredits}>&copy; Scott Taylor ...&nbsp;
          Brooklyn, NY ... <a href="https://twitter.com/wonderboymusic">@wonderboymusic</a>&nbsp;
        ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis / SCSS</footer>
      </div>
    );
  }
}
