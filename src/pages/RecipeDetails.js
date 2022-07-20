import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Food from '../components/CardDetails/Food';
import Drinks from '../components/Cards/DrinksCards';
import { getAPI } from '../helpers';

function RecipeDetails({ match: { params: { id }, path } }) {
  const [data, setData] = useState({});

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
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
      {!path === '/drinks/' ? <Food data={ data } /> : <Drinks data={ data } />}
    </article>
  );
}

RecipeDetails.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
