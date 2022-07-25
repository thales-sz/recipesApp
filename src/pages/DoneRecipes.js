import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
import Header from '../components/Header/Header';
import { doneRecipeStructure } from '../helpers';
import ShareButton from '../components/ShareAndFavoriteButtons/ShareButton';

const copy = require('clipboard-copy');

// [{"id":"13332","type":"drink","nationality":"brazil","category":"category","alcoholicOrNot":"alcoholic","name":"Nome da receita","image":"https://www.themealdb.com/images/media/meals/58oia61564916529.jpg","doneDate":"31/10/2000","tags":"drugs"}]
function DoneRecipes() {
  const [isCopied, setIsCopied] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem('doneRecipes'));
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipeStructure));
    }
  }, []);

  const recipeCardImg = (index) => `${index}-horizontal-image`;
  const recipeCardCategory = (index) => `${index}-horizontal-top-text`;
  const recipeCardName = (index) => `${index}-horizontal-name`;
  const recipeCardDate = (index) => `${index}-horizontal-done-date`;
  const recipeCardShare = (index) => `${index}-horizontal-share-btn`;
  const recipeCardTag = (index, tag) => `${index}-${tag}-horizontal-tag`;

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const handleClickShare = (recipe) => {
    setIsCopied(true);
    if (recipe.type === 'food') {
      return copy(`http://localhost:3000/foods/${recipe.id}`);
    } copy(`http://localhost:3000/drinks/${recipe.id}`);
  };
  console.log(doneRecipes);
  return (
    <div>
      <Header title="Done Recipes" />
      <nav className="filters-container">
        <button data-testid="filter-by-all-btn" type="button">All</button>
        <button data-testid="filter-by-food-btn" type="button">Food</button>
        <button data-testid="filter-by-drink-btn" type="button">Drink</button>
      </nav>
      <section className="done-recipes-container">
        {doneRecipes?.map((recipe, index) => {
          if (recipe.type === 'drink') {
            return (
              <div
                key={ index }
                className="done-recipe"
              >
                <img
                  src={ recipe.image }
                  alt="drink"
                  data-testid={ recipeCardImg(index) }
                />
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
                  <div data-testid={ recipeCardName(index) }>{recipe.name}</div>
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
              <img src={ recipe.image } alt="food" data-testid={ recipeCardImg(index) } />
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
                <div data-testid={ recipeCardName(index) }>{recipe.name}</div>
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
