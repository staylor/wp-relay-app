import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { graphql } from 'react-relay';
import { routerShape } from 'found/lib/PropTypes';
import {
  ThemeProvider,
  PageWrapper,
  Content,
  Primary,
  Secondary,
} from 'wp-styled-components/lib/App';
import theme from 'wp-styled-components/lib/theme';
import 'wp-styled-components/lib/global';
import FragmentContainer from 'decorators/FragmentContainer';
import Settings from 'components/Settings';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';

const langCache = {};

const getMessages = locale => {
  if (langCache[locale]) {
    return langCache[locale];
  }
  // eslint-disable-next-line global-require, import/no-dynamic-require
  langCache[locale] = require(`../../langs/${locale}.js`).default;
  return langCache[locale];
};

@FragmentContainer(graphql`
  fragment App_viewer on Viewer {
    settings {
      title
      description
      language
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
    router: routerShape.isRequired,
  };

  static defaultProps = {
    children: null,
  };

  static childContextTypes = {
    router: routerShape.isRequired,
  };

  state = {
    locale: 'en',
  };

  constructor(props, context) {
    super(props, context);

    this.removeTransitionHook = props.router.addTransitionHook(this.onTransition);
  }

  componentDidMount() {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const localeData = require(`react-intl/locale-data/${this.state.locale}`);
    addLocaleData(localeData);
  }

  componentWillUnmount() {
    this.removeTransitionHook();
  }

  onTransition = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  };

  getChildContext() {
    return {
      router: this.props.router,
    };
  }

  render() {
    const { viewer: { settings, navMenu, sidebar }, children } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={this.state.locale} messages={getMessages(this.state.locale)}>
          <PageWrapper>
            <Settings settings={settings} locale={this.state.locale} />
            <Header {...{ settings, navMenu }} />
            <Content>
              <Primary>
                {children}
              </Primary>
              <Secondary>
                <Sidebar sidebar={sidebar} />
              </Secondary>
            </Content>
            <Footer />
          </PageWrapper>
        </IntlProvider>
      </ThemeProvider>
    );
  }
}
