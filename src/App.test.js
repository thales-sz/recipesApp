import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { renderWithRouterAndStore } from './testConfig'

describe('1 - Página de Login', () => {
  test('Espera os inputs de email e senha e o botão com o texto \'Enter\'', () => {
    renderWithRouterAndStore(<App />);

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('email-input');
    const btnEnter = screen.getByText(/Enter/i);


    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(btnEnter).toBeInTheDocument();
  });
  
  test('Verifica se o botão com o data-testid="login-submit-btn" se encontra desabilitado inicialmente e após inserir um email e senha nos formatos válidos ele habilita', () => {
    const { store } = renderWithRouterAndStore(<App />);
    const btnLogin = screen.getByTestId('login-submit-btn');
    expect(btnLogin).toBeDisabled();

    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('email-input');

    userEvent.type(email, 'teste@tes');
    userEvent.type(password, 'teste');
    expect(btnLogin).toBeDisabled();

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste1');
    expect(btnLogin).toBeDisabled();

    userEvent.type(email, 'teste@testecom');
    userEvent.type(password, 'teste12');
    expect(btnLogin).toBeDisabled();

    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste123');
    expect(store.getState().disabled).toBeFalsy();
  })
})
