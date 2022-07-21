import React from 'react';
import { useSelector } from 'react-redux';
import Ingredients from '../Ingredients/Ingredients';

function FoodProgress() {
  const globalState = useSelector((state) => state.reducer);
  console.log(globalState.details.meals[0]);
  const recipe = globalState.details.meals[0];
  const ingredients = Object.entries(recipe)
    .filter((ingredient) => {
      if (ingredient[1] !== '') {
        return ingredient[0].includes('strIngredient');
      } return false;
    });

  return (
    <section>
      <img src={ recipe.strMealThumb } alt="receita" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h2 data-testid="recipe-category">{recipe.strCategory}</h2>
      {ingredients.map(
        (ingredi, index) => (<Ingredients
          key={ index }
          ingredient={ ingredi }
          index={ index }
        />),
      )}
      <article data-testid="instructions">{recipe.strInstructions}</article>
      <button data-testid="finish-recipe-btn" type="button">FINALIZAR</button>
    </section>
  );
}

export default FoodProgress;
