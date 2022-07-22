import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodProgress from '../components/CardProgress/FoodProgress';
import DrinksProgress from '../components/CardProgress/DrinksProgress';
import { getAPI } from '../helpers';

function RecipeInProgress({ match: { params: { id }, path } }) {
  const [data, setData] = useState(false);

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
      console.log(`${endpoint}${id}`);
      const recipe = await getAPI(`${endpoint}${id}`);
      setData(recipe);
    };
    if (path === '/drinks/:id/in-progress') {
      return getRecipeDetail('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    } getRecipeDetail('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
  }, [id, path]);

  return (
    <section>
      <h2>recipe in progress</h2>
      {path === '/drinks/:id/in-progress' ? (
        <DrinksProgress recipeProgress={ data?.drinks } />
      )
        : (
          <FoodProgress recipeProgress={ data?.meals } />
        ) }
    </section>
  );
}

RecipeInProgress.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default (RecipeInProgress);
