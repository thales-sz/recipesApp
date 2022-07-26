import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndStore } from '../testConfig';
import Recipes from '../pages/Recipes';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipeInProgress from '../pages/RecipeInProgress';

const favoriteRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot:  'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];
  
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

describe('Página de Recipes', () => {
    test('Verifica se na página inicial de Receitas de Drinks possui o header com o título', async () => {
        renderWithRouterAndStore(<RecipeInProgress />, { route: '/drinks/17203/in-progress' });
        expect(screen.getByRole('img', {name: /receita/i})).toBeInTheDocument();
    });

    test('Verifica se na página inicial de Receitas de Drinks possui o header com o título', async () => {
        renderWithRouterAndStore(<RecipeInProgress />, { route: '/foods/52977/in-progress' });
        expect(screen.getByRole('img', {name: /receita/i})).toBeInTheDocument();
    });
})
