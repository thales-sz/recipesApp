import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import DrinksCards from '../components/Cards/DrinksCards';
import FoodCards from '../components/Cards/FoodCards';

import Footer from '../components/Footer.js';
import Header from '../components/Header';

function Recipes() {
  const history = useHistory();
  const globalState = useSelector((state) => state.reducer);
  const [foodOrDrink, setFoodOrDrink] = useState(false);
  console.log('globalState no Recipes:', globalState);

  useEffect(() => {
    const { foods, drinks } = globalState;
    const route = history.location.pathname;
    if (route === '/foods' || route === `/foods/${foods[0]?.idMeal}`) {
      setFoodOrDrink(true);
    }
    if (route === '/drinks' || route === `/drinks/${drinks[0]?.idDrink}`) {
      setFoodOrDrink(false);
    }
  }, [history.location.pathname, globalState]);

  return (
    <main>
      <Header foodOrDrink={ foodOrDrink } />
      {foodOrDrink ? <FoodCards /> : <DrinksCards />}
      <Footer />
    </main>
  );
}

export default Recipes;
