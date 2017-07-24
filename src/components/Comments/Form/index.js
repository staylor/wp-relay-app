import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { css } from 'glamor';
import AddCommentMutation from 'mutations/AddComment';
import {
  AUTHOR_NAME_COOKIE,
  AUTHOR_EMAIL_COOKIE,
  AUTHOR_URL_COOKIE,
} from 'components/Comments/constants';
import styles from './styles';

const fields = {
  author_name: { name: 'Name', cookie: AUTHOR_NAME_COOKIE },
  author_email: { name: 'Email', cookie: AUTHOR_EMAIL_COOKIE },
  author_url: { name: 'URL', cookie: AUTHOR_URL_COOKIE },
};

const getDefaultState = props => {
  const state = {
    content: '',
  };

  Object.keys(fields).forEach(field => {
    state[field] = props.cookies.get(fields[field].cookie) || '';
  });

  return state;
};

@withCookies
export default class Form extends Component {
  static contextTypes = {
    relay: PropTypes.object.isRequired,
  };

  static propTypes = {
    cookies: PropTypes.instanceOf(Cookies).isRequired,
    post: PropTypes.string.isRequired,
    replyTo: PropTypes.string,
    setReplyTo: PropTypes.func.isRequired,
  };

  static defaultProps = {
    replyTo: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      comment: getDefaultState(props),
    };
  }

  onClick = e => {
    e.preventDefault();
    e.currentTarget.blur();

    const variables = {
      input: {
        ...this.state.comment,
        post: this.props.post,
      },
    };

    if (this.props.replyTo) {
      variables.input.parent = this.props.replyTo;
    }

    AddCommentMutation.commit(this.context.relay.environment, variables, () => {
      this.setState({
        comment: getDefaultState(this.props),
      });
    });
  };

  onChange = e => {
    this.setState({
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value,
      },
    });
  };

  onCancel = () => {
    this.props.setReplyTo(null);
  };

  render() {
    const { cookies } = this.props;

    return (
      <form className={css(styles.form)} onSubmit={e => e.preventDefault()}>
        {Object.keys(fields).map(field => {
          const cookieVal = cookies.get(fields[field].cookie);
          return (
            <p key={field}>
              <label htmlFor={`field-${field}`}>
                {fields[field].name}:
              </label>
              {cookieVal ||
                <input
                  type="text"
                  id={`field-${field}`}
                  name={field}
                  value={this.state.comment[field]}
                  onChange={this.onChange}
                />}
            </p>
          );
        })}
        <p>
          <label htmlFor="field-content">Comment:</label>
          <textarea
            rows="6"
            id="field-content"
            name="content"
            value={this.state.comment.content}
            onChange={this.onChange}
          />
        </p>
        <button type="submit" className={css(styles.button)} onClick={this.onClick}>
          Submit
        </button>
        {this.props.replyTo
          ? <button type="reset" className={css(styles.reset)} onClick={this.onCancel}>
              Cancel
            </button>
          : null}
      </form>
    );
  }
}
