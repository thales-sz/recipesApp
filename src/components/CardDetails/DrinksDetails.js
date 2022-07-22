import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';

const URL_FOODS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

export default function DrinksDetails({ recipeDetails }) {
  const [data, setData] = useState();
  const createArray = () => Array.from({ length: 15 }, (_, i) => i + 1);
  const arrayAux = createArray();
  const dispatch = useDispatch();
  const { foods } = useSelector((state) => state.reducer);

  useEffect(() => {
    const epa = recipeDetails ? recipeDetails[0] : recipeDetails;
    setData(epa);
    const getFoodsRecomendations = async () => {
      const dataFoods = await getAPI(URL_FOODS);
      dispatch(addRecipeFoods(dataFoods));
    };
    getFoodsRecomendations();
  }, [dispatch, recipeDetails]);

  const dataTestIdIngredients = (index) => `${index}-ingredient-name-and-measure`;
  const strIngredient = (index) => `strIngredient${index}`;
  const srtMeansure = (index) => `strMeasure${index}`;
  const dataTestCard = (index) => `${index}-recomendation-card`;
  const foodLink = (id) => `/foods/${id}`;
  const imageCard = (food) => `${food.strMealThumb}`;

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
      <div className="ingredients-container">
        {console.log(recipeDetails)}
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
      <div className="recomendations-container">
        <h3>Recomendations</h3>
        { foods?.map((food, index) => (
          <Link
            key={ index }
            data-testid={ dataTestCard(index) }
            to={ foodLink(food.idMeal) }
          >
            <img
              src={ imageCard(food) }
              alt="food"
              width="50"
            />
            <p>{food.strMeal}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

DrinksDetails.propTypes = {
  data: PropTypes.objectOf(PropTypes.array.isRequired),
}.isRequired;
