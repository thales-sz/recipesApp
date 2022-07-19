import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAPI } from '../../helpers';
import { addRecipeDrinks } from '../../redux/actions';

function DrinksCards() {
  const dispatch = useDispatch();
  const [arrayDrinks, setArrayDrinks] = useState();
  const [arrayCategoryDrinks, setCategoryCategoryDrinks] = useState();

  useEffect(() => {
    const getDrinks = async () => {
      const drinks = await getAPI('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const categorysDrinks = await getAPI('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      dispatch(addRecipeDrinks(drinks));
      setArrayDrinks(drinks.drinks);
      setCategoryCategoryDrinks(categorysDrinks.drinks);
      return drinks;
    };
    return getDrinks();
  }, [dispatch]);

  const dataTestCard = (index) => `${index}-recipe-card`;
  const imageCard = (food) => `${food.strDrinkThumb}`;
  const dataTestName = (index) => `${index}-card-name`;
  const dataTestImg = (index) => `${index}-card-img`;
  const dataTestCat = (cat) => `${cat}-category-filter`;

  const TWELVE = 12;
  const twelveDrinks = arrayDrinks?.slice(0, TWELVE);
  const FIVE = 5;
  const categoryFiveDrinks = arrayCategoryDrinks?.slice(0, FIVE);

  return (
    <div>
      <div>
        <button type="button" data-testid="all-category">All</button>
        {categoryFiveDrinks?.map((cat, index) => (
          <button
            type="button"
            key={ index }
            data-testid={ dataTestCat(cat.strCategory) }
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
      { twelveDrinks?.map((drink, index) => (
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
