import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndStore } from '../testConfig';
import Recipes from '../pages/Recipes';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RecipeInProgress from '../pages/RecipeInProgress';

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