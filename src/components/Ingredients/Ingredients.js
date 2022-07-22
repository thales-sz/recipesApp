import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import { saveIngredient, recipesInProgressStruture } from '../../helpers';
import './Ingredients.css';

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

  const handleChange = ({ target }) => {
    setCheckedState(!checkedState);
    saveIngredient(target.parentNode, pathname, id);
  };

  return (
    ingredient[1] ? (
      <div
        style={ pathname.includes('/drinks') && JSON.parse(localStorage
          .getItem('inProgressRecipes'))?.cocktails[id]?.includes(ingredient[1]) ? (
            { textDecoration: 'line-through' }
          ) : ({ textDecoration: '' }) }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          className="input-ingredient"
          type="checkbox"
          checked={ pathname.includes('/drinks') ? (
            JSON.parse(localStorage
              .getItem('inProgressRecipes'))?.cocktails[id]?.includes(ingredient[1])
          ) : (
            JSON.parse(localStorage
              .getItem('inProgressRecipes'))?.meals[id]?.includes(ingredient[1])
          ) }
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
