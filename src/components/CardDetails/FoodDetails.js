import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
      dispatch(addRecipeDrinks(dataDrinks));
    };
    getDrinksRecomendations();
  }, [dispatch]);

  const dataTestIdIngredients = (index) => `${index}-ingredient-name-and-measure`;
  const strIngredient = (index) => `strIngredient${index}`;
  const srtMeansure = (index) => `strMeasure${index}`;
  const dataTestCard = (index) => `${index}-recomendation-card`;
  const drinkLink = (drink) => `/drinks/${drink}`;
  const imageCard = (food) => `${food.strDrinkThumb}`;

  return (
    <div>
      <h1 data-testid="recipe-title">{data?.strMeal}</h1>
      <p data-testid="recipe-category">{data?.strCategory}</p>
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
      <div className="instructions-container">
        <h3>Instructions</h3>
        <p data-testid="instructions">{data?.strInstructions}</p>
      </div>
      <div className="video-container">
        <iframe
          data-testid="video"
          width="560"
          height="315"
          src={ String(data?.strYoutube).replace('watch?v=', 'embed/') }
          title={ `How to make ${data?.strMeal}` }
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="recomendations-container">
        <h3>Recomendations</h3>
        { drinks?.map((drink, index) => (
          <Link
            key={ index }
            data-testid={ dataTestCard(index) }
            to={ drinkLink(drink.idDrink) }
          >
            <img
              src={ imageCard(drink) }
              alt="drink"
              width="50"
            />
            <p>{drink.strDrink}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

FoodDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(PropTypes.object.isRequired),
}.isRequired;
