import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar/SearchBar';
import './Header.css';

function Header({ title, foodOrDrink }) {
  const [isSearchEnabled, setState] = useState(false);
  const [inputSearch, setInputSearch] = useState('');

  const handleChange = ({ target: { value } }) => {
    setInputSearch(value);
  };

  const handleClickButtonSearch = () => {
    setState(!isSearchEnabled);
  };

  return (
    <header className="header-container">
      {(title === 'Profile' || title === 'Done Recipes' || title === 'Favorite Recipes')
        ? (<h2 data-testid="page-title">{title}</h2>) : (
          <h2 data-testid="page-title">{foodOrDrink ? 'Foods' : 'Drinks'}</h2>
        )}
      <Link to="/profile">
        <img
          data-testid="profile-top-btn"
          className="profileIcon"
          alt="profile-button"
          src={ profileIcon }
        />
      </Link>
      {(title === 'Profile' || title === 'Done Recipes' || title === 'Favorite Recipes')
        ? null : (
          <button type="button" onClick={ handleClickButtonSearch }>
            <img
              data-testid="search-top-btn"
              className="searchIcon"
              alt="search-button"
              src={ searchIcon }
            />
          </button>
        )}
      {isSearchEnabled && (
        <>
          <input
            type="text"
            data-testid="search-input"
            value={ inputSearch }
            onChange={ handleChange }
          />
          <SearchBar inputSearch={ inputSearch } />
        </>
      )}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Header);
