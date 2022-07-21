import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndStore } from '../testConfig';

describe('Teste do Header', () => {
  test('1. Teste se o Header possui os ícones de perfil, de pesquisa e o título da página', async () => {
    renderWithRouterAndStore (<App />)

    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    fireEvent.change(inputEmail, {target: {value: 'teste@trybe.com'}});
    fireEvent.change(inputSenha, {target: {value: 'teste1234'}});
    const btnLogin = screen.getByTestId('login-submit-btn');
    fireEvent.click(btnLogin);

    const title = await screen.findByText(/foods/i);
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    const searchBtn = screen.getByTestId(/search-top-btn/i);

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test ('2. Verifica se ao clicar no botão de perfil a pessoa usuária é redirecionada para a tela de perfil', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    fireEvent.change(inputEmail, {target: {value: 'teste@trybe.com'}});
    fireEvent.change(inputSenha, {target: {value: 'teste1234'}});
    const btnLogin = screen.getByTestId('login-submit-btn');
    fireEvent.click(btnLogin);
    
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    fireEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });

  test ('3. Teste se ao clicar no botão de pesquisa do header será aberto uma aba de fitros de pesquisa', async () => {
    renderWithRouterAndStore(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    fireEvent.change(inputEmail, {target: {value: 'teste@trybe.com'}});
    fireEvent.change(inputSenha, {target: {value: 'teste1234'}});
    const btnLogin = screen.getByTestId('login-submit-btn');
    fireEvent.click(btnLogin);
    
    const searchBtn = screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
    
    const searchInput = screen.getByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'xablau'}});
    const searchIngredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    const searchFirstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    const btnBuscar = screen.getByTestId(/exec-search-btn/i);
    
    expect(searchInput).toBeInTheDocument();
    expect(searchIngredientRadio).toBeInTheDocument();
    expect(searchFirstLetterRadio).toBeInTheDocument();
    expect(btnBuscar).toBeInTheDocument();
  });
})