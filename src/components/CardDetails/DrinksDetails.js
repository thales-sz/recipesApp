import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function DrinksDetails({ recipeDetails }) {
  const createArray = () => Array.from({ length: 15 }, (_, i) => i + 1);
  const arrayAux = createArray();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.reducer);

  const data = recipeDetails ? recipeDetails[0] : recipeDetails;

  useEffect(() => {
    const getFoodsRecomendations = async () => {
      const dataFoods = await getAPI(URL_FOODS);
      console.log(dataFoods);
      dispatch(addRecipeFoods(dataFoods));
    };
    getFoodsRecomendations();
  }, [dispatch]);

  const dataTestIdIngredients = (index) => `${index}-ingredient-name-and-measure`;
  const strIngredient = (index) => `strIngredient${index}`;
  const srtMeansure = (index) => `strMeasure${index}`;
  const dataTestCard = (index) => `${index}-recomendation-card`;
  const detailsCard = (id) => `drinks/${id.idDrink}`;
  const imageCard = (food) => `${food.strDrinkThumb}`;

  return (
    <>
      {console.log(data)}
      <h1 data-testid="recipe-title">{data?.strDrink}</h1>
      <p data-testid="recipe-category">{data?.strAlcoholic}</p>
      <br />
      <img
        src={ data?.strDrinkThumb }
        alt={ data?.strDrink }
=======
import { Link } from 'react-router-dom';

function DrinksDetails({ recipeDetails }) {
  const e = recipeDetails ? recipeDetails[0] : recipeDetails;
  console.log(e);
  return (
    <div>
      <h1 data-testid="recipe-title">{e?.strDrink}</h1>
      <p data-testid="recipe-category">{e?.strCategory}</p>
      <br />
      <img
        src={ e?.strDrinkThumb }
        alt={ e?.strDrink }

        width="200px"
        data-testid="recipe-photo"
      />
      <div className="ingredients-container">
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.array.isRequired),
}.isRequired;
