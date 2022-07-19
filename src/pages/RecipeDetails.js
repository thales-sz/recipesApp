import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAPI } from '../helpers';

function RecipeDetails({ match: { params: { id }, path } }) {
  console.log(path);
  console.log(id);

  useEffect(() => {
    const getRecipeDetail = async (endpoint) => {
      const recipe = await getAPI(`${endpoint}${id}`);
      console.log(recipe);
    };
    if (path === '/drinks/:id') {
      return getRecipeDetail('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=');
    }
    getRecipeDetail('https://www.themealdb.com/api/json/v1/1/lookup.php?i=');
  }, [id, path]);

  return (
    <article>
      <h2>RecipeDetails</h2>
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
