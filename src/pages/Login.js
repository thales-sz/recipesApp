// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  render() {
    return (
      <form>
        <label htmlFor="email-input">
          Email:
          <input
            type="email"
            id="email-input"
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            type="password"
            id="password-input"
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-btn"
        >
          Enter
        </button>
      </form>
    );
  }
}

Login.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Login);
