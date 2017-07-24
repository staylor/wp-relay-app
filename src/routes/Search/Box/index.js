import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import { css } from 'glamor';
import Loading from 'components/Loading';
import styles from './styles';

export default class Search extends Component {
  static propTypes = {
    onSetTerm: PropTypes.func.isRequired,
    onRefetch: PropTypes.func.isRequired,
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
      this.props.onRefetch(e);
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
    const searching = this.state.term && (this.state.fetching || !pageInfo);

    if (this.state.term) {
      if (searching) {
        title = `Searching the archive for “${this.state.term}”`;
      } else {
        title = `Search Results for “${this.state.term}”`;
      }
    }

    return (
      <section className={css(styles.box)}>
        <h2 className={css(styles.label)}>
          {title}
        </h2>
        <form>
          <label className={css(styles.a11y)} htmlFor="field-term">
            Search Term
          </label>
          <input
            className={css(styles.input)}
            type="search"
            id="field-term"
            name="term"
            value={this.state.term}
            onChange={this.onChange}
          />
        </form>
        {searching && <Loading />}
      </section>
    );
  }
}
