import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

function FavoriteRecipes(props) {
  console.log(props);
  return (
    <Header title="Favorite Recipes" />
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
