import React from 'react';
import Header from '../components/Header/Header';
import Footer from '../components/Footer.js';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  return (
    <div>
      <Header title="Profile" />
      <h3 data-testid="profile-email">{email}</h3>
      <button type="button" data-testid="profile-done-btn">Done Recipes</button>
      <button type="button" data-testid="profile-favorite-btn">Favorite Recipes</button>
      <button type="button" data-testid="profile-logout-btn">Logout</button>
      <Footer />
    </div>
  );
}

export default Profile;
