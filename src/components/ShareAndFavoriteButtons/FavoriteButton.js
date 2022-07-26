import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

function FavoriteButton({ recipeId }) {
  const [isFav, setIsFav] = useState(false);
  useEffect(() => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    favoriteRecipes.forEach((recipe) => {
      if (recipe.id === recipeId) {
        setIsFav(true);
      }
    });
  }, [recipeId]);

  return (
    <img src={ isFav ? blackHeartIcon : whiteHeartIcon } alt="Botão de favorito" />
  );
}

FavoriteButton.propTypes = {
  recipeId: PropTypes.string,
}.isRequired;

export default FavoriteButton;
