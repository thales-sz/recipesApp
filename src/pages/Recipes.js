// import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer.js';
import Header from '../components/Header';

function Recipes(props) {
  console.log(props);
  const history = useHistory();
  const [foodOrDrink, setFoodOrDrink] = useState(false);

  useEffect(() => {
    const route = history.location.pathname;
    if (route === '/foods') {
      setFoodOrDrink(true);
    }
  }, [history.location.pathname]);

  return (
    <main>
      {foodOrDrink ? (
        <Header title="Foods" />
      ) : (
        <Header title="Drinks" />
      )}
      <Footer />
    </main>
  );
}

Recipes.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(Recipes);
