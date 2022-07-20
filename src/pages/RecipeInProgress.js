import React from 'react';
import PropTypes from 'prop-types';
import FoodProgress from '../components/CardProgress/FoodProgress';
import DrinksProgress from '../components/CardProgress/DrinksProgress';

function RecipeInProgress({ match: { path } }) {
  return (
    <section>
      <h2>recipe in progress</h2>
      {path === '/drinks/:id/in-progress' ? (
        <DrinksProgress />
      )
        : (
          <FoodProgress />
        ) }
    </section>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default (RecipeInProgress);
