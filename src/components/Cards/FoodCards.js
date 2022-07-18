import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';

function FoodCards() {
  const dispatch = useDispatch();
  const [arrayFoods, setArrayFoods] = useState();
  useEffect(() => {
    const getFoods = async () => {
      const foods = await getAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      dispatch(addRecipeFoods(foods));
      setArrayFoods(foods.meals);
      return foods;
    };
    return getFoods();
  }, [dispatch]);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strMealThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;

  const TWELVE = 12;
  const twelve = arrayFoods?.slice(0, TWELVE);

  return (
    <div>
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
