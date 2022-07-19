import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';

function FoodCards() {
  const dispatch = useDispatch();
  const [arrayFoods, setArrayFoods] = useState();
  const [arrayCategoryFoods, setCategoryCategoryFoods] = useState();
  useEffect(() => {
    const getFoods = async () => {
      const foods = await getAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const categorys = await getAPI('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      dispatch(addRecipeFoods(foods));
      setCategoryCategoryFoods(categorys.meals);
      setArrayFoods(foods.meals);
      return foods;
    };
    return getFoods();
  }, [dispatch]);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strMealThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;
  const dataTestCat = (cat) => `${cat}-category-filter`;

  const TWELVE = 12;
  const FIVE = 5;
  const twelve = arrayFoods?.slice(0, TWELVE);
  const categoryFive = arrayCategoryFoods?.slice(0, FIVE);

  return (
    <div>
      <div>
        <button type="button" data-testid="all-category">All</button>
        {categoryFive?.map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ dataTestCat(cat.strCategory) }
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
      { twelve?.map((food, index) => (
        <section
          key={ food.idMeal }
          data-testid={ dataTestCard(index) }
        >
          <img
            data-testid={ dataTestImg(index) }
            src={ imageCard(food) }
            alt="food"
            width="50"
          />
          <p data-testid={ dataTestName(index) }>{food.strMeal}</p>
        </section>
      ))}
    </div>
  );
}

export default FoodCards;
