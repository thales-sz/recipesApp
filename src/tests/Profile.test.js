import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndStore } from '../testConfig';

describe('Testes da página "Profile"', () => {
  test('Verifica o caminho até a página Profile', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEnter = screen.getByText(/Enter/i);
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste123');
    userEvent.click(btnEnter);

    const profileBtn = screen.getByRole('img', { name: /profile\-button/i });
    userEvent.click(profileBtn)
    expect(history.location.pathname).toBe('/profile');
  });
  test('Verifica os componentes da página', () => {
    renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEnter = screen.getByText(/Enter/i);
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste123');
    userEvent.click(btnEnter);
    const profileBtn = screen.getByRole('img', { name: /profile\-button/i });
    userEvent.click(profileBtn)

    const pageTitle = screen.getByRole('heading', {
      name: /profile/i
    })
    expect(pageTitle).toBeInTheDocument();
    const userEmail = screen.getByRole('heading', {
      name: /teste@teste\.com/i
    })
    expect(userEmail).toBeInTheDocument();
  })
  test('Botão DONE leva ao caminho correto', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEnter = screen.getByText(/Enter/i);
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste123');
    userEvent.click(btnEnter);
    const profileBtn = screen.getByRole('img', { name: /profile\-button/i });
    userEvent.click(profileBtn)

    const doneBtn = screen.getByRole('button', {
      name: /done recipes/i
    });
    expect(doneBtn).toBeInTheDocument();
    userEvent.click(doneBtn);
    expect(history.location.pathname).toBe('/done-recipes');
  })
  test('Botão FAVORITE leva ao caminho correto', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEnter = screen.getByText(/Enter/i);
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste123');
    userEvent.click(btnEnter);
    const profileBtn = screen.getByRole('img', { name: /profile\-button/i });
    userEvent.click(profileBtn)

    const favoriteBtn = screen.getByRole('button', {
      name: /favorite recipes/i
    });
    expect(favoriteBtn).toBeInTheDocument();
    userEvent.click(favoriteBtn);
    expect(history.location.pathname).toBe('/favorite-recipes');
  })
  test('Botão LOGOUT leva ao caminho correto', () => {
    const { history } = renderWithRouterAndStore(<App />);
    const email = screen.getByTestId('email-input');
    const password = screen.getByTestId('password-input');
    const btnEnter = screen.getByText(/Enter/i);
    userEvent.type(email, 'teste@teste.com');
    userEvent.type(password, 'teste123');
    userEvent.click(btnEnter);
    const profileBtn = screen.getByRole('img', { name: /profile\-button/i });
    userEvent.click(profileBtn)

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i
    });
    expect(logoutBtn).toBeInTheDocument();
    userEvent.click(logoutBtn);
    expect(history.location.pathname).toBe('/');
  })
})