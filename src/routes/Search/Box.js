// @flow
import React, { Component } from 'react';
import debounce from 'debounce';
import { Heading, Loading } from 'wp-styled-components';
import { SearchBox, SearchInput, A11Y } from 'wp-styled-components/lib/Search';
import type { SearchBoxProps } from 'wp-relay-app';

export default class Search extends Component {
  props: SearchBoxProps;

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
      <SearchBox>
        <Heading>
          {title}
        </Heading>
        <form>
          <A11Y htmlFor="field-term">Search Term</A11Y>
          <SearchInput
            type="search"
            id="field-term"
            name="term"
            value={this.state.term}
            onChange={this.onChange}
          />
        </form>
        {searching && <Loading />}
      </SearchBox>
    );
  }
}
