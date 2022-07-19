import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Login extends React.Component {
  state={
    email: '',
    password: '',
    disabled: true,
  }

  onButtonChange = () => {
    const { password, email } = this.state;
    const NUM = 6;
    if (password.length > NUM && email.match(/\S+@\S+\.\S+/)) {
      return this.setState({ disabled: false });
    } this.setState({ disabled: true });
  };

  onInputChange = (event) => {
    this.setState({ [event.target.id]: event.target.value }, this.onButtonChange);
  }

  onClickButton = () => {
    const { email } = this.state;
    const { history } = this.props;
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    history.push('/foods');
  }

  render() {
    const { email, password, disabled } = this.state;
    return (
      <main className="main-login">
        <form className="form-login ">
          <h1 className="signIn-title">Iniciar sessão</h1>
          <label htmlFor="email">
            Email:
            <input
              className="input-login"
              type="email"
              id="email"
              value={ email }
              data-testid="email-input"
              onChange={ this.onInputChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              className="input-login"
              type="password"
              id="password"
              value={ password }
              data-testid="password-input"
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="button-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ disabled }
            onClick={ this.onClickButton }
          >
            Enter
          </button>
        </form>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Login);
