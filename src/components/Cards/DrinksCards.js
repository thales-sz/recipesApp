import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeDrinks } from '../../redux/actions';

function DrinksCards() {
  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.reducer);

  useEffect(() => {
    const getDrinks = async () => {
      const drinks = await getAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      dispatch(addRecipeDrinks(drinks));
    };
    getDrinks();
  }, [dispatch]);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strDrinkThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;

  const TWELVE = 12;
  const drinksArray = globalState.drinks?.slice(0, TWELVE);

  return (
    <div>
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
