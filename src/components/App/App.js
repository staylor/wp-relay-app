import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider } from 'react-intl';
import Helmet from 'react-helmet';
import { graphql } from 'react-relay';
import FragmentContainer from 'decorators/FragmentContainer';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import styles from './App.scss';

const description = 'High for This aggregates the best music content on the web.';

@FragmentContainer(graphql`
  fragment App_viewer on Viewer {
    settings {
      title
      description
    }
    navMenu(id: $menuID) {
      ...NavMenu_navMenu
    }
    sidebar(id: $sidebarID) {
      ...Sidebar_sidebar
    }
  }
`)
export default class App extends Component {
  static propTypes = {
    viewer: PropTypes.shape({
      settings: PropTypes.object,
      navMenu: PropTypes.object,
      sidebar: PropTypes.object,
    }).isRequired,
    children: PropTypes.node,
    // eslint-disable-next-line react/forbid-prop-types
    router: PropTypes.object.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  static childContextTypes = {
    router: PropTypes.object,
  };

  getChildContext() {
    return {
      router: this.props.router,
    };
  }

  state = {
    locale: 'en',
  };

  render() {
    const { viewer: { settings, navMenu, sidebar }, children } = this.props;

    return (
      <IntlProvider locale={this.state.locale}>
        <div className={styles.page}>
          <Helmet titleTemplate={`%s - ${settings.title}`} defaultTitle={settings.title}>
            <html lang={this.state.locale} prefix="og: http://ogp.me/ns#" />
            <title>{settings.description}</title>
            <meta httpEquiv="Content-Language" content={this.state.locale} />
            <meta property="og:site_name" content={settings.title} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content="website" />
          </Helmet>
          <Header {...{ settings, navMenu }} />
          <div className={styles.content}>
            <section className={styles.primary}>
              {children}
            </section>
            <section className={styles.secondary}>
              <Sidebar sidebar={sidebar} />
            </section>
          </div>
          <footer className={styles.footerCredits}>
            © Scott Taylor ...&nbsp;
            Brooklyn, NY ...
            {' '}
            <a href="https://twitter.com/wonderboymusic">
              @wonderboymusic
            </a>&nbsp;
            ... Powered by GraphQL / React / Relay / WordPress / nginx / Redis /
            SCSS
          </footer>
        </div>
      </IntlProvider>
    );
  }
}
