import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header/Header';

function DoneRecipes(props) {
  console.log(props);
  return (
    <Header title="Done Recipes" />
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoneRecipes);
