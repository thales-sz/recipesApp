import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer.js';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const handleClick = ({ target: { id } }) => {
    switch (id) {
    case 'done-recipes':
      history.push(`/${id}`);
      break;
    case 'favorite-recipes':
      history.push(`/${id}`);
      break;
    default:
      localStorage.clear();
      history.push('/');
      break;
    }
  };

  return (
    <div>
      <Header title="Profile" />
      <div className="profile-container">
        <h3 data-testid="profile-email">{userEmail?.email}</h3>
        <button
          type="button"
          id="done-recipes"
          data-testid="profile-done-btn"
          onClick={ handleClick }
        >
          Done Recipes
        </button>
        <button
          type="button"
          id="favorite-recipes"
          data-testid="profile-favorite-btn"
          onClick={ handleClick }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          id="logout"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
