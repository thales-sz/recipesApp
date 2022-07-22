import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Ingredients from '../Ingredients/Ingredients';
import FavoriteButton from '../ShareAndFavoriteButtons/FavoriteButton';
import ShareButton from '../ShareAndFavoriteButtons/ShareButton';

const copy = require('clipboard-copy');

function FoodProgress({ recipeProgress }) {
  const location = useLocation();
  const recipe = recipeProgress ? recipeProgress[0] : recipeProgress;
  const aux = recipe ? (
    Object.entries(recipe)
      .filter((ingredient) => ingredient[0].includes('strIngredient'))
  ) : (null);
  const ingredients = aux?.filter((ingr) => ingr[1] !== null);
  console.log(ingredients, 'ingredientes');

  const handleClickFavoriteFood = () => {
    console.log('oi');
  };

  const handleClickShareFood = async () => {
    global.alert('Link copied!');
    await copy(`http://localhost:3000${location.pathname}`);
  };

  return (
    <section>
      <img
        src={ recipe?.strMealThumb }
        alt="receita"
        data-testid="recipe-photo"
        width="100%"
        height="155px"
      />
      <h2 data-testid="recipe-title">{recipe?.strMeal}</h2>
      <button data-testid="share-btn" type="button" onClick={ handleClickShareFood }>
        <ShareButton />
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleClickFavoriteFood }
      >
        <FavoriteButton />
      </button>
      <h2 data-testid="recipe-category">{recipe?.strCategory}</h2>
      {ingredients?.map(
        (ingredi, index) => (<Ingredients
          key={ index }
          ingredient={ ingredi }
          index={ index }
        />),
      )}
      <article data-testid="instructions">{recipe?.strInstructions}</article>
      <button data-testid="finish-recipe-btn" type="button">FINALIZAR</button>
    </section>
  );
}

FoodProgress.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default FoodProgress;
