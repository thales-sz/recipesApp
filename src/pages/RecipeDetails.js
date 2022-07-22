import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getAPI } from '../helpers';
import FoodDetails from '../components/CardDetails/FoodDetails';
import DrinksDetails from '../components/CardDetails/DrinksDetails';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [data, setData] = useState(false);

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
      const recipe = await getAPI(`${endpoint}${id}`);
      setData(recipe);
    };
    if (path === '/drinks/:id') {
      getRecipeDetail('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    } getRecipeDetail('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
  }, [id, path]);

  return (
    <article>
      <h2>RecipeDetails</h2>
      {
        path === '/drinks/:id'
          ? <DrinksDetails recipeDetails={ data?.drinks } />
          : <FoodDetails recipeDetails={ data?.meals } />
      }
    </article>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default RecipeDetails;
