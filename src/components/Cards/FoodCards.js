import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';

function FoodCards() {
  const dispatch = useDispatch();
  const [arrayCategoryFoods, setCategoryCategoryFoods] = useState();
  const globalState = useSelector((state) => state.reducer);
  const [categorySearch, setCategorySearch] = useState('');
  const FIVE = 5;

  useEffect(() => {
    const getDrinks = async (endpoint) => {
      const foods = await getAPI(`${endpoint}${categorySearch}`);
      dispatch(addRecipeFoods(foods));
    };
    if (!categorySearch) {
      return getDrinks('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    }
    getDrinks('https://www.themealdb.com/api/json/v1/1/filter.php?c=');
  }, [dispatch, categorySearch]);

  useEffect(() => {
    const getDrinksCategorys = async () => {
      const categorys = await getAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      setCategoryCategoryFoods(categorys.meals?.slice(0, FIVE));
    };
    getDrinksCategorys();
  }, []);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strMealThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;
  const dataTestCat = (cat) => `${cat}-category-filter`;
  const detailsCard = (id) => `/foods/${id.idMeal}`;

  const category = arrayCategoryFoods;
  const foodsArray = globalState.foods;

  const onSearchChange = (value) => {
    if (value.strCategory === categorySearch) {
      return setCategorySearch('');
    } setCategorySearch(value.strCategory);
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setCategorySearch('') }
        >
          All
        </button>
        {category?.map((cat, index) => (
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
      { foodsArray?.map((food, index) => (
        <a
          key={ food.idMeal }
          data-testid={ dataTestCard(index) }
          href={ detailsCard(food) }
        >
          <img
            data-testid={ dataTestImg(index) }
            src={ imageCard(food) }
            alt="food"
            width="50"
          />
          <p data-testid={ dataTestName(index) }>{food.strMeal}</p>
        </a>
      ))}
    </div>
  );
}

export default FoodCards;
