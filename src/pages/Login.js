import React from 'react';
import { connect } from 'react-redux';

function Login() {
  return (
    <div>Essa é a página de login</div>
  );
}

const mapStateToProps = (globalState) => ({
  globalState,
});

export default connect(mapStateToProps)(Login);
