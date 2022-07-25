import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAPI } from '../helpers';
import FoodDetails from '../components/CardDetails/FoodDetails';
import DrinksDetails from '../components/CardDetails/DrinksDetails';

function RecipeDetails() {
  const location = useLocation();
  const path = location.pathname;
  const [data, setData] = useState();

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
      const recipe = await getAPI(`${endpoint}${path.split('/')[2]}`);
      setData(recipe);
    };
    if (path === `/drinks/${path.split('/')[2]}`) {
      return getRecipeDetail('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    } getRecipeDetail('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
  }, [path]);

  return (
    <article>
      <h2>RecipeDetails</h2>
      {
        path === `/drinks/${path.split('/')[2]}`
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
