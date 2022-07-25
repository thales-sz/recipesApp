import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Ingredients from '../Ingredients/Ingredients';
import FavoriteButton from '../ShareAndFavoriteButtons/FavoriteButton';
import ShareButton from '../ShareAndFavoriteButtons/ShareButton';

const copy = require('clipboard-copy');

function DrinksProgress({ recipeProgress }) {
  const location = useLocation();
  const [isCopied, setIsCopied] = useState(false);
  const recipe = recipeProgress ? recipeProgress[0] : null;
  const aux = recipe ? (
    Object.entries(recipe)
      .filter((ingredient) => ingredient[0].includes('strIngredient'))
  ) : (null);
  const ingredients = aux?.filter((ingr) => ingr[1] !== null);

  const handleClickFavorite = () => {
    console.log('oi');
  };

  const handleClickShare = () => {
    setIsCopied(true);
    copy(`http://localhost:3000${location.pathname.split('/in')[0]}`);
  };

  return (
    <section>
      <img
        src={ recipe?.strDrinkThumb }
        alt="receita"
        data-testid="recipe-photo"
        width="100%"
        height="155px"
      />
      <h2 data-testid="recipe-title">{recipe?.strDrink}</h2>
      <button data-testid="share-btn" type="button" onClick={ handleClickShare }>
        <ShareButton />
        {isCopied && <p>Link copied!</p>}
      </button>
      <button data-testid="favorite-btn" type="button" onClick={ handleClickFavorite }>
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

DrinksProgress.propTypes = {
  recipeProgress: PropTypes.object,
}.isRequired;

export default DrinksProgress;
