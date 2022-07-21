import React from 'react';
import PropTypes from 'prop-types';

function Ingredients({ ingredient, index }) {
  return (
    ingredient[1] ? (
      <div data-testid={ `${index + 1}-ingredient-step` }>{ingredient[1]}</div>
    ) : (null)
  );
}

Ingredients.propTypes = {
  ingredient: PropTypes.string,
}.isRequired;

export default Ingredients;
