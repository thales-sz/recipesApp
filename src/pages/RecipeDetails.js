import PropTypes from 'prop-types';
import React/* , { useEffect }  */from 'react';
import { connect } from 'react-redux';

function RecipeDetails({ match: { params: { id }, path } }) {
  console.log(path);
  console.log(id);
  return (
    <div>RecipeDetails</div>
  );
}

RecipeDetails.propTypes = {};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = {};

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
    params: PropTypes.shape({ id: PropTypes.string.isRequired }),
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetails);
