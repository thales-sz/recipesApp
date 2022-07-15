// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function RecipeDetails(props) {
  console.log(props);
  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
