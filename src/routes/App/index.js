import React, { PropTypes, Component } from 'react';
import Relay, { withRelay } from 'decorators/withRelay';
import { Link } from 'react-router';
import styles from './styles.scss';

@withRelay({
  fragments: {
    categories: () => Relay.QL`
      fragment on CategoryCollection {
        results(first: 10) {
          edges {
            node {
              id
              name
            }
            cursor
          }
        }
      }
    `,
  },
})
export default class App extends Component {

  render() {
    const {
      children,
      categories: { results: { edges: categories } },
    } = this.props;

    return (
      <div>
        <i className={styles.logo} />
        <ul className={styles.nav}>
          <li className={styles.navItem}>
            <Link className={styles.link} to="/">Home</Link>
          </li>
          {categories.map(({ node: { id, name }, cursor }) => (
            <li key={cursor} className={styles.navItem}>
              <Link
                className={styles.link}
                activeClassName={styles.activeLink}
                to={`/category/${id}`}
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node,
};
