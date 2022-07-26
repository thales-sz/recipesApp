import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';
import ShareButton from '../ShareAndFavoriteButtons/ShareButton';
import FavoriteButton from '../ShareAndFavoriteButtons/FavoriteButton';

const copy = require('clipboard-copy');

const SIX = 6;

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function DrinksDetails({ recipeDetails }) {
  const location = useLocation();
  const [isCopied, setIsCopied] = useState(false);
  const createArray = () => Array.from({ length: 15 }, (_, i) => i + 1);
  const arrayAux = createArray();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.reducer);

  const data = recipeDetails ? recipeDetails[0] : recipeDetails;

  useEffect(() => {
    const getFoodsRecomendations = async () => {
      const dataFoods = await getAPI(URL_FOODS);
      dispatch(addRecipeFoods(dataFoods));
    };
    getFoodsRecomendations();
  }, [dispatch]);

  const dataTestIdIngredients = (index) => `${index}-ingredient-name-and-measure`;
  const strIngredient = (index) => `strIngredient${index}`;
  const srtMeansure = (index) => `strMeasure${index}`;
  const dataTestCard = (index) => `${index}-recomendation-card`;
  const dataTestCardTitle = (index) => `${index}-recomendation-title`;
  const foodLink = (id) => `/foods/${id}`;
  const imageCard = (food) => `${food.strMealThumb}`;

  const handleClickFavorite = () => {
    let getStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const objFavorite = {
      id: data.idDrink,
      type: 'drink',
      nationality: '',
      category: data.strCategory,
      alcoholicOrNot: data.strAlcoholic,
      name: data.strDrink,
      image: data.strDrinkThumb,
    };

    if (!getStorage) {
      const arr = [];
      arr.push(objFavorite);
      localStorage.setItem('favoriteRecipes', JSON.stringify(arr));
    }

    if (getStorage) {
      const verify = getStorage.some((cur) => cur.id === data.idDrink);
      if (!verify) {
        localStorage.favoriteRecipes = JSON.stringify(getStorage.concat(objFavorite));
      }
      if (verify) {
        getStorage = getStorage.filter((curr) => curr.id !== id);
        localStorage.favoriteRecipes = JSON.stringify(getStorage);
      }
    }
  };

  const handleClickShare = () => {
    setIsCopied(true);
    copy(`http://localhost:3000${location.pathname.split('/in')[0]}`);
  };

  const history = useHistory();
  const startRecipe = () => {
    history.push(`${location.pathname}/in-progress`);
  };

  const recomendations = foods.slice(0, SIX);

  return (
    <div>
      <h1 data-testid="recipe-title">{data?.strDrink}</h1>
      <p data-testid="recipe-category">{data?.strAlcoholic}</p>
      <br />
      <img
        src={ data?.strDrinkThumb }
        alt={ data?.strDrink }
        width="200px"
        data-testid="recipe-photo"
      />
      <button data-testid="share-btn" type="button" onClick={ handleClickShare }>
        <ShareButton />
        {isCopied && <p>Link copied!</p>}
      </button>
      <button data-testid="favorite-btn" type="button" onClick={ handleClickFavorite }>
        <FavoriteButton />
      </button>
      <div className="ingredients-container">
        <h3>Ingredients</h3>
        <ul>
          {recipeDetails?.map((dataInfo) => arrayAux.map(
            (number) => dataInfo[strIngredient(number)] !== null && (
              <li
                key={ number }
                data-testid={ dataTestIdIngredients(number - 1) }
              >
                {dataInfo[srtMeansure(number)]}
                {' - '}
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
      <h3>Recomendations</h3>
      <div className="recomendations-container">
        { recomendations?.map((food, index) => (
          <div
            key={ index }
            className="recomendations"
            data-testid={ dataTestCard(index) }
          >
            <Link
              to={ foodLink(food.idMeal) }
            >
              <img
                src={ imageCard(food) }
                alt="drink"
              />
              <p data-testid={ dataTestCardTitle(index) }>{food.strMeal}</p>
            </Link>
          </div>
        ))}
      </div>
      <footer className="container-btn">
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
          style={ { position: 'fixed' } }
          onClick={ startRecipe }
        >
          Start Recipe
        </button>
      </footer>
    </div>
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.array.isRequired),
}.isRequired;
