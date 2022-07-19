import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeDrinks } from '../../redux/actions';

function DrinksCards() {
  const dispatch = useDispatch();
  const [arrayCategoryDrinks, setCategoryCategoryDrinks] = useState();
  const globalState = useSelector((state) => state.reducer);
  const [drinkCategorySearch, setDrinkCategorySearch] = useState('');
  const FIVE = 5;

  useEffect(() => {
    const getDrinks = async (endpoint) => {
      const drinks = await getAPI(`${endpoint}${drinkCategorySearch}`);
      dispatch(addRecipeDrinks(drinks));
    };
    if (!drinkCategorySearch) {
      return getDrinks('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    }
    getDrinks('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=');
  }, [dispatch, drinkCategorySearch]);

  useEffect(() => {
    const getDrinksCategorys = async () => {
      const categorysDrinks = await getAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      setCategoryCategoryDrinks(categorysDrinks.drinks?.slice(0, FIVE));
    };
    getDrinksCategorys();
  }, []);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strDrinkThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;
  const dataTestCat = (cat) => `${cat}-category-filter`;

  const drinksArray = globalState.drinks;
  const categoryFiveDrinks = arrayCategoryDrinks;

  const onSearchChange = (value) => {
    if (value.strCategory === drinkCategorySearch) {
      return setDrinkCategorySearch('');
    } setDrinkCategorySearch(value.strCategory);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setDrinkCategorySearch('') }
        >
          All
        </button>
        {categoryFiveDrinks?.map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ dataTestCat(cat.strCategory) }
            onClick={ () => onSearchChange(cat) }
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
      { drinksArray?.map((drink, index) => (
        <section
          key={ drink.idDrink }
          data-testid={ dataTestCard(index) }
        >
          <img
            data-testid={ dataTestImg(index) }
            src={ imageCard(drink) }
            alt="drink"
            width="50"
          />
          <p data-testid={ dataTestName(index) }>{drink.strDrink}</p>
        </section>
      ))}
    </div>
  );
}

export default DrinksCards;
