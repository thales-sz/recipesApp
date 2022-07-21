import React from 'react';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndStore } from '../testConfig';
import userEvent from '@testing-library/user-event';

const login = () => {
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    fireEvent.change(inputEmail, {target: {value: 'teste@trybe.com'}});
    fireEvent.change(inputSenha, {target: {value: 'teste1234'}});
    const btnLogin = screen.getByTestId('login-submit-btn');
    fireEvent.click(btnLogin);
}

describe('Teste do Footer', () => {
    test('1. Verifica se o footer contém os  ícone de comidas e ao clicar redireciona para a página /foods', async () => {
        const {history} = renderWithRouterAndStore(<App />)
        login();
        history.push('/drinks');
        const iconFood = await screen.findByTestId(/food-bottom-btn/i);
        expect(iconFood).toBeInTheDocument();
        fireEvent.click(iconFood);
        const { pathname } = history.location;
        await waitFor (() => expect(pathname).toBe('/foods'), {timeout: 2000});
    });

    test('2. Verifica se o footer contém os  ícone de comidas e ao clicar redireciona para a página /drinks', async () => {
        const {history} = renderWithRouterAndStore(<App />)
        login();

        const iconDrink = await screen.findByTestId(/drinks-bottom-btn/i);
        expect(iconDrink).toBeInTheDocument();
        fireEvent.click(iconDrink);

        const { pathname } = history.location;
        await waitFor (() => expect(pathname).toBe('/drinks'), {timeout: 2000});

        const iconFood = await screen.findByTestId(/food-bottom-btn/i);
        expect(iconFood).toBeInTheDocument();
        
    })
});
