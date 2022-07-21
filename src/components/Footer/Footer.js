import React from 'react';
import { Link } from 'react-router-dom';
import foodIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import './style.css';

export default function Footer() {
  // const history = useHistory();

  return (
    <footer className="footer-container" data-testid="footer">
      <div className="foods-container">
        <Link to="/foods">
          <img
            data-testid="food-bottom-btn"
            className="foodIcon"
            alt="foods"
            src={ foodIcon }
          />
        </Link>
      </div>
      <div className="drink-container">
        <Link to="/drinks">
          <img
            data-testid="drinks-bottom-btn"
            className="drinksIcon"
            alt="drinks"
            src={ drinkIcon }
          />
        </Link>
      </div>
    </footer>
  );
}
