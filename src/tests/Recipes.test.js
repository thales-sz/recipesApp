import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndStore } from '../testConfig';
import Recipes from '../pages/Recipes';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Página de Recipes', () => {
    test('Verifica se na página inicial de Receitas possui o header com o título', async () => {
        renderWithRouterAndStore(<Recipes />);
        
        const titleHeader = await screen.findByTestId('page-title');
        expect(titleHeader).toBeInTheDocument(); 
    });

    test('Verifica se na página inicial de Receitas possui botão de categoria e  ao clicar em Drinks ele vai para rota /drinks', async () => {
        jest.spyOn(global, 'fetch');
        const {history} = renderWithRouterAndStore(<App />);
        const btnLogin = screen.getByTestId('login-submit-btn');
        expect(btnLogin).toBeDisabled();
    
        const email = screen.getByTestId('email-input');
        const password = screen.getByTestId('password-input');
        userEvent.type(email, 'teste@teste.com');
        userEvent.type(password, 'teste123');
        const btnLoginEnabled = screen.getByTestId('login-submit-btn');
        userEvent.click(btnLoginEnabled);
        const {pathname} = history.location;
        expect(pathname).toBe('/foods')

        const btnDrinks = await screen.findByTestId('drinks-bottom-btn');
        userEvent.click(btnDrinks);
        

        await waitFor(() => expect(screen.getByText('GG')).toBeInTheDocument(), {timeout: 2000});
        const drinkGG = await screen.findByText('GG');
       

        await waitFor(() => expect(screen.getByRole('button', {name: 'Cocoa'})).toBeInTheDocument(), {timeout: 2000});
    });
})