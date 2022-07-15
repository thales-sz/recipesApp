import React from 'react';
import { connect } from 'react-redux';

function FavoriteRecipes(props) {
  console.log(props);
  return (
    <div>FavoriteRecipes</div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteRecipes);
