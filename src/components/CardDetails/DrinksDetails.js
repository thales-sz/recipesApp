import React from 'react';
import PropTypes from 'prop-types';

function DrinksDetails({ recipeDetails }) {
  return (
    <>
      {console.log('drinks', recipeDetails)}
    </>
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.array.isRequired),
}.isRequired;

export default DrinksDetails;
