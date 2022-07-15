import React, { useState } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAPI } from '../helpers';

const ENDPOINT_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}';

function SearchBar(props) {
  const [radioState, setRadioState] = useState('');

  const handleRadioChange = ({ target: { id } }) => {
    setRadioState(id);
  };

  const handleCLick = async () => {
    const { inputSearch } = props;
    const result = await getAPI(ENDPOINT_INGREDIENT);
    console.log(result);
  };

  return (
    <nav>
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          name="radio-search"
          onChange={ handleRadioChange }
        />
        Ingredient
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          name="radio-search"
          id="name"
          onChange={ handleRadioChange }
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          name="radio-search"
          id="first-letter"
          onChange={ handleRadioChange }
        />
        First Letter
      </label>
      <button type="button" data-testid="exec-search-btn" onClick={ handleCLick }>
        Buscar
      </button>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  state,
});

SearchBar.propTypes = {
  inputSearch: propTypes.string,
}.isRequired;

export default connect(mapStateToProps)(SearchBar);
