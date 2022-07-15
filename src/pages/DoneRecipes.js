import React from 'react';
import { connect } from 'react-redux';

function DoneRecipes(props) {
  console.log(props);
  return (
    <div>DoneRecipes</div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoneRecipes);
