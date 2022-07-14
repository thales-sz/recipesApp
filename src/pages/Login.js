// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Login() {
  return (
    <form>
      <label htmlFor="email-input">
        Email:
        <input
          id="email-input"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="password-input">
        Senha:
        <input
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

Login.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Login);
