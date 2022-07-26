import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getAPI } from '../../helpers';
import { addRecipeDrinks } from '../../redux/actions';
import FavoriteButton from '../ShareAndFavoriteButtons/FavoriteButton';
import ShareButton from '../ShareAndFavoriteButtons/ShareButton';
import './Details.css';

const copy = require('clipboard-copy');

const SIX = 6;

const URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export default function FoodDetails({ recipeDetails }) {
  const location = useLocation();
  const createArray = () => Array.from({ length: 20 }, (_, i) => i + 1);
  const [isCopied, setIsCopied] = useState(false);
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
  const dataTestCardTitle = (index) => `${index}-recomendation-title`;
  const drinkLink = (drink) => `/drinks/${drink}`;
  const imageCard = (food) => `${food.strDrinkThumb}`;

  const handleClickShare = () => {
    setIsCopied(true);
    copy(`http://localhost:3000${location.pathname.split('/in')[0]}`);
  };

  const handleClickFavorite = () => {
    let getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let objFavorite = {};
    recipeDetails.forEach((elem) => {
      objFavorite = {
        id: elem.idMeal,
        type: 'food',
        nationality: elem.strArea,
        category: elem.strCategory,
        alcoholicOrNot: '',
        name: elem.strMeal,
        image: elem.strMealThumb,
      };
    });

    if (!getStorage) {
      const arr = [];
      arr.push(objFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
    }

    if (getStorage) {
      const verify = getStorage?.some((cur) => cur.id === data.idMeal);
      if (!verify) {
        localStorage.favoriteRecipes = JSON.stringify(getStorage.concat(objFavorite));
        console.log('entrou');
      }
      if (verify) {
        getStorage = getStorage.filter((curr) => curr.id !== id);
        localStorage.favoriteRecipes = JSON.stringify(getStorage);
      }
    }
  };

  const history = useHistory();
  const startRecipeFood = () => {
    history.push(`${location.pathname}/in-progress`);
  };

  const recomendations = drinks?.slice(0, SIX);
  return (
    <div>
      <h1 data-testid="recipe-title">{data?.strMeal}</h1>
      <p data-testid="recipe-category">{data?.strCategory}</p>
      <br />
      <img
        src={ data?.strMealThumb }
        alt={ data?.strMeal }
        width="100%"
        height="300"
        data-testid="recipe-photo"
      />
      <button data-testid="share-btn" type="button" onClick={ handleClickShare }>
        <ShareButton />
        {isCopied && <p>Link copied!</p>}
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
        onClick={ handleClickFavorite }
      >
        <FavoriteButton />
      </button>
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
          width="100%"
          height="300"
          src={ String(data?.strYoutube).replace('watch?v=', 'embed/') }
          title={ `How to make ${data?.strMeal}` }
          frameBorder="0"
          allow="accelerometer; clipboard-write; encrypted-media;
          gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h3>Recomendations</h3>
      <div className="recomendations-container">
        { recomendations?.map((drink, index) => (
          <div
            key={ index }
            className="recomendations"
            data-testid={ dataTestCard(index) }
          >
            <Link
              to={ drinkLink(drink.idDrink) }
            >
              <img
                src={ imageCard(drink) }
                alt="drink"
              />
              <p data-testid={ dataTestCardTitle(index) }>{drink.strDrink}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="container-btn">
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          style={ { position: 'fixed' } }
          onClick={ startRecipeFood }
        >
          Start Recipe
        </button>
      </div>
    </div>
  );
}

FoodDetails.propTypes = {
  recipeDetails: PropTypes.arrayOf(PropTypes.object.isRequired),
}.isRequired;
