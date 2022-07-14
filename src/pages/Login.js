// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Login(props) {
  console.log(props);
  return (
    <div>Login</div>
  );
}

Login.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Login);
