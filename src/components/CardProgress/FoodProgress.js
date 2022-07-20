import React from 'react';
import PropTypes from 'prop-types';

function FoodProgress({ data }) {
  console.log(data);
  return (
    <section>
      FoodProgress
    </section>
  );
}

FoodProgress.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default FoodProgress;
