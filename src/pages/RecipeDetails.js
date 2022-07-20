import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { NavItem } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getAPI } from '../helpers';

function RecipeDetails({ match: { params: { id }, path } }) {
  console.log(path);
  console.log(id);

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
  console.log(data.meals);
  return (
    <article>
      <h2>RecipeDetails</h2>
      <br />
      {data.meals.map((e) => (
        <div key={ e.idMeal }>
          <h1 data-testid="recipe-title">{ e.strMeal }</h1>
          <p data-testid="recipe-category">{ e.strCategory }</p>
          <br />
          <img
            src={ e.strMealThumb }
            alt={ e.strMeal }
            width="200px"
            data-testid="recipe-photo"
          />
          <br />
          <h3>Ingredientes:</h3>
          <p data-testid="1-ingredient-name-and-measure">{ e.strIngredient1 }</p>
          <p data-testid="2-ingredient-name-and-measure">{ e.strIngredient2 }</p>
          <p data-testid="3-ingredient-name-and-measure">{ e.strIngredient3 }</p>
          <p data-testid="4-ingredient-name-and-measure">{ e.strIngredient4 }</p>
          <p data-testid="5-ingredient-name-and-measure">{ e.strIngredient5 }</p>
          <p data-testid="6-ingredient-name-and-measure">{ e.strIngredient6 }</p>
          <p data-testid="7-ingredient-name-and-measure">{ e.strIngredient7 }</p>
          <p data-testid="8-ingredient-name-and-measure">{ e.strIngredient8 }</p>
          <p data-testid="9-ingredient-name-and-measure">{ e.strIngredient9 }</p>
          <p data-testid="10-ingredient-name-and-measure">{ e.strIngredient10 }</p>
          <p data-testid="11-ingredient-name-and-measure">{ e.strIngredient11 }</p>
          <p data-testid="12-ingredient-name-and-measure">{ e.strIngredient12 }</p>
          <p data-testid="13-ingredient-name-and-measure">{ e.strIngredient13 }</p>
          <br />
          <h3>Instruções:</h3>
          <p data-testid="instructions">{ e.strInstructions }</p>
          <iframe
            title={ e.strMeal }
            src={ e.strYoutube }
            width="500px"
            height="300px"
            frameBorder="0"
          />

        </div>
      ))}
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
