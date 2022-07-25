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

  const verifyChecked = () => {
    if (pathname.includes('/drinks')) {
      return JSON.parse(localStorage
        .getItem('inProgressRecipes'))?.cocktails[id]?.includes(ingredient[1]);
    } return JSON.parse(localStorage
      .getItem('inProgressRecipes'))?.meals[id]?.includes(ingredient[1]);
  };

  const verifyStyleDrinks = () => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))
      ?.cocktails[id]?.includes(ingredient[1])) {
      return { textDecoration: 'line-through' };
    } return { textDecoration: '' };
  };

  const verifyStyleFoods = () => {
    if (JSON.parse(localStorage.getItem('inProgressRecipes'))
      ?.meals[id]?.includes(ingredient[1])) {
      return { textDecoration: 'line-through' };
    } return { textDecoration: '' };
  };

  return (
    ingredient[1] ? (
      <div
        style={ pathname.includes('/drinks') ? verifyStyleDrinks() : verifyStyleFoods() }
        data-testid={ `${index}-ingredient-step` }
      >
        <input
          className="input-ingredient"
          type="checkbox"
          checked={ verifyChecked() }
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
