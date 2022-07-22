import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { saveIngredient, recipesInProgressStruture } from '../../helpers';

function Ingredients({ ingredient, index }) {
  const [checkedState, setCheckedState] = useState(false);
  const { pathname } = useLocation();
  const { id } = useParams();

  useEffect(() => {
    const item = localStorage.getItem('inProgressRecipes');
    if (item === null) {
      localStorage
        .setItem('inProgressRecipes', JSON.stringify(recipesInProgressStruture));
    }
  }, []);

  useEffect(() => {
    const { meals, cocktails } = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (pathname.includes('/drinks')) {
      if (cocktails !== undefined) {
        return cocktails[id]?.includes(ingredient[1]) && setCheckedState(true);
      }
    } else if (meals !== undefined) {
      return meals[id]?.includes(ingredient[1]) && setCheckedState(true);
    }
  }, [pathname, ingredient, checkedState, id]);

  const handleChange = ({ target }) => {
    setCheckedState(!checkedState);
    saveIngredient(target.parentNode, pathname, id);
  };

  return (
    ingredient[1] ? (
      <div
        style={ checkedState
          ? { textDecoration: 'line-through' }
          : { textDecoration: '' } }
        data-testid={ `${index}-ingredient-step` }
        htmlFor={ `${index}-ingredient-step` }
      >
        <input
          id={ `${index}-ingredient-step` }
          type="checkbox"
          checked={ checkedState }
          onChange={ handleChange }
        />
        {ingredient[1]}
      </div>
    ) : null
  );
}

Ingredients.propTypes = {
  ingredient: PropTypes.string,
}.isRequired;

export default (Ingredients);
