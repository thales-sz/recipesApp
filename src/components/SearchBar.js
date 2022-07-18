import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAPI } from '../helpers';
import { addRecipeDrinks, addRecipeFoods } from '../redux/actions';

function SearchBar({ inputSearch }) {
  const [radioState, setRadioState] = useState('');
  const globalState = useSelector((state) => state.reducer);
  const [foodOrDrink, setFoodOrDrink] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const route = history.location.pathname;
    if (route === '/foods') {
      return setFoodOrDrink(true);
    } setFoodOrDrink(false);
  }, [history.location.pathname]);

  useEffect(() => {
    const { foods, drinks } = globalState;
    if (foodOrDrink && foods?.length === 1) history.push(`/foods/${foods[0].idMeal}`);
    if (!foodOrDrink && drinks?.length === 1) {
      history.push(`/drinks/${drinks[0].idDrink}`);
    }
  }, [globalState, foodOrDrink, history]);

  const handleRadioChange = ({ target: { id } }) => {
    setRadioState(id);
  };

  const setFoods = async () => {
    let searchEndpoint;
    switch (radioState) {
    default:
      searchEndpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      dispatch(addRecipeFoods(await getAPI(searchEndpoint)));
      break;
    case 'Name':
      searchEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      dispatch(addRecipeFoods(await getAPI(searchEndpoint)));
      break;
    case 'First letter':
      if (inputSearch.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      searchEndpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      dispatch(addRecipeFoods(await getAPI(searchEndpoint)));
      break;
    }
  };

  const setDrinks = async () => {
    console.log(globalState);
    let searchEndpoint;
    switch (radioState) {
    default:
      searchEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      dispatch(addRecipeDrinks(await getAPI(searchEndpoint)));
      break;
    case 'Name':
      searchEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      dispatch(addRecipeDrinks(await getAPI(searchEndpoint)));
      break;
    case 'First letter':
      if (inputSearch.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      searchEndpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
      dispatch(addRecipeDrinks(await getAPI(searchEndpoint)));
      break;
    }
  };

  const handleCLick = async () => {
    if (foodOrDrink) {
      setFoods();
    }
    if (!foodOrDrink) {
      setDrinks();
    }
  };

  return (
    <nav>
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="Ingredient"
          name="radio-search"
          onChange={ handleRadioChange }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="radio-search"
          id="Name"
          onChange={ handleRadioChange }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-search"
          id="First letter"
          onChange={ handleRadioChange }
        />
        First Letter
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ handleCLick }>
        Buscar
      </button>
    </nav>
  );
}

SearchBar.propTypes = {
  inputSearch: propTypes.string,
}.isRequired;

export default SearchBar;
