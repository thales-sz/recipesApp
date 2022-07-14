import React, { useState } from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';
import { getAPI } from '../helpers';

const ENDPOINT_MEAL = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';

function SearchBar(props) {
  const [radioState, setRadioState] = useState('');

  const handleRadioChange = ({ target: { id } }) => {
    setRadioState(id);
  };

  const handleCLick = async () => {
    const { inputSearch } = props;
    console.log(radioState, inputSearch);
    const result = getAPI(ENDPOINT_MEAL);
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
