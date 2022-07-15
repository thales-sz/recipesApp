import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title }) {
  const [isSearchEnabled, setState] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const history = useHistory();

  const handleChange = ({ target: { value } }) => {
    setInputSearch(value);
  };

  const handleClickButtonProfile = () => {
    history.push('/profile');
  };

  const handleClickButtonSearch = () => {
    setState(!isSearchEnabled);
  };

  return (
    <header>
      <h2 data-testid="page-title">{title}</h2>
      <button type="button" onClick={ handleClickButtonProfile }>
        <object
          data-testid="profile-top-btn"
          className="profileIcon"
          type="image/svg+xml"
          src={ profileIcon }
          data={ profileIcon }
        >
          Profile
        </object>
      </button>
      <button type="button" onClick={ handleClickButtonSearch }>
        <object
          data-testid="search-top-btn"
          className="searchIcon"
          type="image/svg+xml"
          src={ searchIcon }
          data={ searchIcon }
        >
          Profile Icon
        </object>
      </button>
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
