import React from 'react';
import { connect } from 'react-redux';

function RecipeInProgress(props) {
  console.log(props);
  return (
    <div>RecipeInProgress</div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeInProgress);
