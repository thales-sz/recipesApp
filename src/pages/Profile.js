import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div>
        <Header title="Profile" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
