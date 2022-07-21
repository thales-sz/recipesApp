import PropTypes from 'prop-types';
import React from 'react';
import Ingredients from '../Ingredients/Ingredients';

function DrinksProgress({ recipeProgress }) {
  console.log(recipeProgress);
  const recipe = recipeProgress ? recipeProgress[0] : recipeProgress;
  const ingredients = recipe ? (
    Object.entries(recipe)
      .filter((ingredient) => {
        if (ingredient[1] !== '') {
          return ingredient[0].includes('strIngredient');
        } return null;
      })
  ) : (null);
  return (
    <section>
      <img src={ recipe?.strDrinkThumb } alt="receita" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{recipe?.strDrink}</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
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

DrinksProgress.propTypes = {
  data: PropTypes.object,
}.isRequired;

export default DrinksProgress;
