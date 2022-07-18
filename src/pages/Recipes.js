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
    const route = history.location.pathname;
    if (route === '/foods') {
      return setFoodOrDrink(true);
    } setFoodOrDrink(false);
  }, [history.location.pathname]);

  return (
    <main>
      <Header foodOrDrink={ foodOrDrink } />
      {foodOrDrink ? <FoodCards /> : <DrinksCards />}
      <Footer />
    </main>
  );
}

export default Recipes;
