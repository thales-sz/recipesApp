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
          <object
            data-testid="food-bottom-btn"
            className="foodIcon"
            type="image/svg+xml"
            src={ foodIcon }
            data={ foodIcon }
          >
            Foods
          </object>
        </Link>
      </div>
      <div className="drink-container">
        <Link to="/drinks">
          <object
            data-testid="drinks-bottom-btn"
            className="drinksIcon"
            type="image/svg+xml"
            src={ drinkIcon }
            data={ drinkIcon }
          >
            Drinks
          </object>
        </Link>
      </div>
    </footer>
  );
}
