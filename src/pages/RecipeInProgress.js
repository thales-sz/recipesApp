import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import FoodProgress from '../components/CardProgress/FoodProgress';
import DrinksProgress from '../components/CardProgress/DrinksProgress';
import { getAPI } from '../helpers';

function RecipeInProgress() {
  const location = useLocation();
  const path = location.pathname;
  const [data, setData] = useState();

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
      const recipe = await getAPI(`${endpoint}${path.split('/')[2]}`);
      setData(recipe);
    };
    if (path === `/drinks/${path.split('/')[2]}/in-progress`) {
      return getRecipeDetail('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    } getRecipeDetail('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
  }, [path]);

  return (
    <section>
      {path === `/drinks/${path.split('/')[2]}/in-progress` ? (
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
