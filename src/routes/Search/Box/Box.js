import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import styles from './Box.scss';

export default class Search extends Component {
  static propTypes = {
    onSetTerm: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    pageInfo: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    relay: PropTypes.object.isRequired,
  };

  static defaultProps = {
    pageInfo: null,
  };

  state = {
    term: '',
    fetching: false,
  };

  refetchVariables = fragmentVariables => ({
    ...fragmentVariables,
    search: this.state.term,
  });

  doRefetch = debounce(() => {
    this.setState({ fetching: true });
    this.props.relay.refetch(this.refetchVariables, null, e => {
      if (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
      this.setState({ fetching: false });
    });
  }, 600);

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    this.props.onSetTerm(e.target.value);
    this.doRefetch();
  };

  render() {
    const { pageInfo } = this.props;
    let title = 'Search the Archive';
    if (this.state.term) {
      if (this.state.fetching || !pageInfo) {
        title = `Searching the archive for “${this.state.term}”`;
      } else {
        title = `Search Results for “${this.state.term}”`;
      }
    }

    return (
      <section className={styles.box}>
        <h3 className={styles.label}>{title}</h3>
        <form>
          <input
            className={styles.input}
            type="search"
            name="term"
            value={this.state.term}
            onChange={this.onChange}
          />
        </form>
      </section>
    );
  }
}
