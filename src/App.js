import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import MainPage from './pages/Recipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/foods" component={ MainPage } />
      <Route path="/drinks" component={ MainPage } />
      <Route path="/profile" component={ Profile } />
    </Switch>
  );
}

export default App;
