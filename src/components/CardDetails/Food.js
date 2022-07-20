import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

function Food({ data }) {
  return (
    <div>
      foods
      {data && (
        data.meals.map((e) => (
          <div key={ e.idMeal }>
            <h1 data-testid="recipe-title">{ e.strMeal }</h1>
            <p data-testid="recipe-category">{ e.strCategory }</p>
            <br />
            <img
              src={ e.strMealThumb }
              alt={ e.strMeal }
              width="200px"
              data-testid="recipe-photo"
            />
            <br />
            <h3>Ingredientes:</h3>
            <p data-testid="1-ingredient-name-and-measure">{ e.strIngredient1 }</p>
            <p data-testid="2-ingredient-name-and-measure">{ e.strIngredient2 }</p>
            <p data-testid="3-ingredient-name-and-measure">{ e.strIngredient3 }</p>
            <p data-testid="4-ingredient-name-and-measure">{ e.strIngredient4 }</p>
            <p data-testid="5-ingredient-name-and-measure">{ e.strIngredient5 }</p>
            <p data-testid="6-ingredient-name-and-measure">{ e.strIngredient6 }</p>
            <p data-testid="7-ingredient-name-and-measure">{ e.strIngredient7 }</p>
            <p data-testid="8-ingredient-name-and-measure">{ e.strIngredient8 }</p>
            <p data-testid="9-ingredient-name-and-measure">{ e.strIngredient9 }</p>
            <p data-testid="10-ingredient-name-and-measure">{ e.strIngredient10 }</p>
            <p data-testid="11-ingredient-name-and-measure">{ e.strIngredient11 }</p>
            <p data-testid="12-ingredient-name-and-measure">{ e.strIngredient12 }</p>
            <p data-testid="13-ingredient-name-and-measure">{ e.strIngredient13 }</p>
            <br />
            <h3>Instruções:</h3>
            <p data-testid="instructions">{ e.strInstructions }</p>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ String(e.strYoutube).replace('watch?v=', 'embed/') }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media;
             gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ))
      )}
    </div>
  );
}

Food.propTypes = {
  data: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Food);
