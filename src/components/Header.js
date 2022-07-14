// import PropTypes from 'prop-types';
import React, { useState } from 'react';
// import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [isSearchEnabled, setState] = useState(false);
  const history = useHistory();

  const handleClickButtonProfile = () => {
    history.push('/profile');
  };

  const handleClickButtonSearch = () => {
    console.log('click do botão search');
    setState(!isSearchEnabled);
  };

  return (
    <header>
      <h2 data-testid="page-title">Titulo da página</h2>
      <button type="button" onClick={ handleClickButtonProfile }>
        <object
          data-testid="profile-top-btn"
          className="profileIcon"
          type="image/svg+xml"
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
          data={ searchIcon }
        >
          Profile Icon
        </object>
      </button>
      {isSearchEnabled && <input type="text" />}
    </header>
  );
}

Header.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Header);
