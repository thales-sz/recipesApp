import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeDrinks } from '../../redux/actions';

const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function FoodDetails({ recipeDetails }) {
  const createArray = () => Array.from({ length: 20 }, (_, i) => i + 1);
  const arrayAux = createArray();
  const dispatch = useDispatch();
  const { drinks } = useSelector((state) => state.reducer);

  const data = recipeDetails ? recipeDetails[0] : recipeDetails;

  useEffect(() => {
    const getDrinksRecomendations = async () => {
      const dataDrinks = await getAPI(URL_DRINKS);
      console.log(dataDrinks);
      dispatch(addRecipeDrinks(dataDrinks));
    };
    getDrinksRecomendations();
  }, [dispatch]);

  const dataTestIdIngredients = (index) => `${index}-ingredient-name-and-measure`;
  const strIngredient = (index) => `strIngredient${index}`;
  const srtMeansure = (index) => `strMeasure${index}`;
  const dataTestCard = (index) => `${index}-recomendation-card`;
  const detailsCard = (id) => `drinks/${id.idDrink}`;
  const imageCard = (food) => `${food.strDrinkThumb}`;

  return (
    <>
      <h1 data-testid="recipe-title">{data?.strMeal}</h1>
      <p data-testid="recipe-category">{data?.strCategory}</p>

import { Link } from 'react-router-dom';

function FoodDetails({ recipeDetails }) {
  const e = recipeDetails ? recipeDetails[0] : recipeDetails;
  return (
    <div>
      <h1 data-testid="recipe-title">{e?.strMeal}</h1>
      <p data-testid="recipe-category">{e?.strCategory}</p>

      <br />
      <img
        src={ data?.strMealThumb }
        alt={ data?.strMeal }
        width="200px"
        data-testid="recipe-photo"
      />
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        <ul>
          {recipeDetails?.map((dataInfo) => arrayAux.map(
            (number) => dataInfo[strIngredient(number)] !== '' && (
              <li key={ number } data-testid={ dataTestIdIngredients(number - 1) }>
                {dataInfo[srtMeansure(number)]}
                {' '}
                {dataInfo[strIngredient(number)]}
              </li>
            ),
          ))}
        </ul>
      </div>
  );
}

FoodDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(PropTypes.object.isRequired),
}.isRequired;
