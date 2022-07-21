import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodDetails({ recipeDetails }) {
  const e = recipeDetails ? recipeDetails[0] : recipeDetails;
  return (
    <div>
      <h1 data-testid="recipe-title">{e?.strMeal}</h1>
      <p data-testid="recipe-category">{e?.strCategory}</p>
      <br />
      <img
        src={ e?.strMealThumb }
        alt={ e?.strMeal }
        width="200px"
        data-testid="recipe-photo"
      />
      <div className="ingredients-container">
        <h3>Ingredientes:</h3>
        <p data-testid="1-ingredient-name-and-measure">{e?.strIngredient1}</p>
        <p data-testid="2-ingredient-name-and-measure">{e?.strIngredient2}</p>
        <p data-testid="3-ingredient-name-and-measure">{e?.strIngredient3}</p>
        <p data-testid="4-ingredient-name-and-measure">{e?.strIngredient4}</p>
        <p data-testid="5-ingredient-name-and-measure">{e?.strIngredient5}</p>
        <p data-testid="6-ingredient-name-and-measure">{e?.strIngredient6}</p>
        <p data-testid="7-ingredient-name-and-measure">{e?.strIngredient7}</p>
        <p data-testid="8-ingredient-name-and-measure">{e?.strIngredient8}</p>
        <p data-testid="9-ingredient-name-and-measure">{e?.strIngredient9}</p>
        <p data-testid="10-ingredient-name-and-measure">{e?.strIngredient10}</p>
        <p data-testid="11-ingredient-name-and-measure">{e?.strIngredient11}</p>
        <p data-testid="12-ingredient-name-and-measure">{e?.strIngredient12}</p>
        <p data-testid="13-ingredient-name-and-measure">{e?.strIngredient13}</p>
        <br />
      </div>
      <Link to={ `/foods/${e?.idMeal}/in-progress` }>PAGINA PROGRESSO</Link>
    </div>
  );
}

FoodDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(PropTypes.object.isRequired),
}.isRequired;

export default FoodDetails;
