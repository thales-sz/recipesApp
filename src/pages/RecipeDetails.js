import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Food from '../components/CardDetails/Food';
import Drink from '../components/CardDetails/Drinks';
import { getAPI } from '../helpers';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [data, setData] = useState(false);

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
      console.log(`${endpoint}${id}`);
      const recipe = await getAPI(`${endpoint}${id}`);
      console.log(recipe);
      setData(recipe);
    };
    if (path === '/drinks/:id') {
      return getRecipeDetail('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    } getRecipeDetail('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
  }, [id, path]);

  return (
    <article>
      <h2>RecipeDetails</h2>
      {path === '/drinks/:id' ? (
        <Drink data={ data } />)
        : <Food /> }
    </article>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.object,
}.isRequired;

export default RecipeDetails;
