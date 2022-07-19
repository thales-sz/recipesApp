import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeFoods } from '../../redux/actions';

function FoodCards() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.reducer);

  useEffect(() => {
    const setFoods = async () => {
      const foods = await getAPI('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      dispatch(addRecipeFoods(foods));
    };
    setFoods();
  }, [dispatch]);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strMealThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;

  const TWELVE = 12;
  const foodsArray = globalState.foods?.slice(0, TWELVE);

  return (
    <div>
      { foodsArray?.map((food, index) => (
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
