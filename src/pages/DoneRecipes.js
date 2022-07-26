import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header/Header';
import ShareButton from '../components/ShareAndFavoriteButtons/ShareButton';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  const [doneRecipes, setRecipes] = useState();

  const recipeCardImg = (index) => `${index}-horizontal-image`;
  const recipeCardCategory = (index) => `${index}-horizontal-top-text`;
  const recipeCardName = (index) => `${index}-horizontal-name`;
  const recipeCardDate = (index) => `${index}-horizontal-done-date`;
  const recipeCardShare = (index) => `${index}-horizontal-share-btn`;
  const recipeCardTag = (index, tag) => `${index}-${tag}-horizontal-tag`;
  const recipeCardLink = (type, id) => `/${type}s/${id}`;

  useEffect(() => {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipes(recipes);
  }, [setRecipes]);

  const handleClickShare = (recipe) => {
    setIsCopied(true);
    if (recipe.type === 'food') {
      return copy(`http://localhost:3000/foods/${recipe.id}`);
    } copy(`http://localhost:3000/drinks/${recipe.id}`);
  };

  const handleClickFilter = ({ target }) => {
    switch (target.value) {
    case 'food':
      setRecipes(doneRecipes.filter((recipe) => recipe.type === 'food'));
      break;
    case 'drink':
      setRecipes(doneRecipes.filter((recipe) => recipe.type === 'drink'));
      break;
    default:
      setRecipes(JSON.parse(localStorage.getItem('doneRecipes')));
      break;
    }
  };

  return (
    <div>
      <Header title="Done Recipes" />
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
        {doneRecipes?.map((recipe, index) => {
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
                  <div data-testid={ recipeCardDate(index) }>
                    Done in:
                    {' '}
                    {recipe.doneDate}
                  </div>
                  <div className="tags">
                    {recipe.tags.map((tag, i) => (
                      <div key={ i } data-testid={ recipeCardTag(i, tag) }>
                        {tag}
                      </div>))}
                  </div>
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
                <div data-testid={ recipeCardDate(index) }>
                  Done in:
                  {' '}
                  {recipe.doneDate}
                </div>
                <div className="tags">
                  {recipe.tags.map((tag) => (
                    <div key={ index } data-testid={ recipeCardTag(index, tag) }>
                      {tag}
                    </div>))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DoneRecipes);
