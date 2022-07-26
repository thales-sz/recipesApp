import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header/Header';
import FavoriteButton from '../components/ShareAndFavoriteButtons/FavoriteButton';
import ShareButton from '../components/ShareAndFavoriteButtons/ShareButton';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteRecipes, setRecipes] = useState();

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipes(recipes);
  }, [setRecipes]);

  const handleClickFilter = ({ target }) => {
    switch (target.value) {
    case 'food':
      setRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setRecipes(favoriteRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      setRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
      break;
    }
  };

  const handleClickShare = (recipe) => {
    setIsCopied(true);
    if (recipe.type === 'food') {
      return copy(`http://localhost:3000/foods/${recipe.id}`);
    } copy(`http://localhost:3000/drinks/${recipe.id}`);
  };

  const handleClickFavorite = (recipe) => {
    const newFav = favoriteRecipes.filter((reci) => reci !== recipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFav));
    setRecipes(newFav);
  };

  const recipeCardImg = (index) => `${index}-horizontal-image`;
  const recipeCardCategory = (index) => `${index}-horizontal-top-text`;
  const recipeCardName = (index) => `${index}-horizontal-name`;
  const recipeCardFavorite = (index) => `${index}-horizontal-favorite-btn`;
  const recipeCardShare = (index) => `${index}-horizontal-share-btn`;
  const recipeCardLink = (type, id) => `/${type}s/${id}`;

  return (
    <div>
      <Header title="Favorite Recipes" />
      <nav className="filters-container">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ handleClickFilter }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          value="food"
          onClick={ handleClickFilter }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          value="drink"
          onClick={ handleClickFilter }
        >
          Drink
        </button>
      </nav>
      <section className="done-recipes-container">
        {favoriteRecipes?.map((recipe, index) => {
          if (recipe.type === 'drink') {
            return (
              <div
                key={ index }
                className="done-recipe"
              >
                <Link to={ recipeCardLink(recipe.type, recipe.id) }>
                  <img
                    src={ recipe.image }
                    alt="drink"
                    data-testid={ recipeCardImg(index) }
                  />
                </Link>
                <div className="info-container">
                  <div />
                  <button
                    data-testid={ recipeCardFavorite(index) }
                    type="button"
                    src={ blackHeartIcon }
                    onClick={ () => handleClickFavorite(recipe) }
                  >
                    <FavoriteButton
                      recipeId={ recipe.id }
                    />
                  </button>
                  <button
                    data-testid={ recipeCardShare(index) }
                    type="button"
                    src={ shareIcon }
                    onClick={ () => handleClickShare(recipe) }
                  >
                    <ShareButton />
                  </button>
                  {isCopied && <p>Link copied!</p>}
                  <div data-testid={ recipeCardCategory(index) }>
                    {recipe.alcoholicOrNot}
                  </div>
                  <Link to={ recipeCardLink(recipe.type, recipe.id) }>
                    <div data-testid={ recipeCardName(index) }>{recipe.name}</div>
                  </Link>
                </div>
              </div>
            );
          } return (
            <div
              key={ index }
              className="done-recipe"
            >
              <Link to={ recipeCardLink(recipe.type, recipe.id) }>
                <img
                  src={ recipe.image }
                  alt="food"
                  data-testid={ recipeCardImg(index) }
                />
              </Link>
              <div className="info-container">
                <button
                  data-testid={ recipeCardFavorite(index) }
                  type="button"
                  src={ blackHeartIcon }
                  onClick={ () => handleClickFavorite(recipe) }
                >
                  <FavoriteButton recipeId={ recipe.id } />
                </button>
                <button
                  data-testid={ recipeCardShare(index) }
                  type="button"
                  src={ shareIcon }
                  onClick={ () => handleClickShare(recipe) }
                >
                  <ShareButton />
                </button>
                {isCopied && <p>Link copied!</p>}
                <div data-testid={ recipeCardCategory(index) }>
                  {recipe.nationality}
                  {' '}
                  -
                  {' '}
                  {recipe.category}
                </div>
                <Link to={ recipeCardLink(recipe.type, recipe.id) }>
                  <div data-testid={ recipeCardName(index) }>{recipe.name}</div>
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

export default (FavoriteRecipes);
