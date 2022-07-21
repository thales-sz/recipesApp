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

describe('Teste do SearchBar', () => {
  test('1. Teste se ao pesquisar Corba, selecionando o input Name, será redirecionado para a página de detalhes da receita pesquisada', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    login();
    const searchBtn =  screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
    
    const searchNameRadio = await screen.findByTestId(/name-search-radio/i);
    fireEvent.click(searchNameRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'Corba'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const recipeTitle = await screen.findByTestId(/recipe-title/i);
    await waitFor(() => expect(recipeTitle).toBeInTheDocument(), {timeout: 2000});
    const { pathname } = history.location;
    await waitFor (() => expect(pathname).toBe('/foods/52977'), {timeout: 2000});
  });

  test('2. Teste se ao pesquisar Lentils, selecionando o input Ingredient, ira retornar Corba e Tahini Lentils', async () => {
    renderWithRouterAndStore(<App />);
    login();
    const searchBtn =  screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
    
    const searchIngredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    fireEvent.click(searchIngredientRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'Lentils'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const recipeCorba = await screen.findByText(/Corba/i);
    await waitFor(() => expect(recipeCorba).toBeInTheDocument(), {timeout: 2000});
  });

  test('3. Teste se ao pesquisar Y, selecionando o input First Letter, será redirecionado para a página de detalhes da receita Yaki Udon', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/');
    login();

    const btnFood = await screen.findByTestId(/food-bottom-btn/i);
    fireEvent.click(btnFood);

    const searchBtn =  screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
       
    const searchFirstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    fireEvent.click(searchFirstLetterRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'Y'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const recipeTitle = await screen.findByTestId(/recipe-title/i);
    await waitFor(() => expect(recipeTitle).toBeInTheDocument(), {timeout: 2000});

    const { pathname } = history.location;
    await waitFor (() => expect(pathname).toBe('/foods/52871'), {timeout: 2000});
  });

  test('4. Teste se ao pesquisar GG, selecionando o input Name, será redirecionado para a página de detalhes da bebida pesquisada', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/');
    login();

    const btnDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    fireEvent.click(btnDrink);
    
    const searchBtn = await screen.findByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
    
    const searchNameRadio = await screen.findByTestId(/name-search-radio/i);
    fireEvent.click(searchNameRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'GG'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const drinkSearch = await screen.findByText(/GG/i);
    await waitFor(() => expect(drinkSearch).toBeInTheDocument(), {timeout: 2000});
  });

  test('5. Teste se ao pesquisar 155 Belmont, selecionando o input Name, será redirecionado para a página de detalhes da bebida pesquisada', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/');
    login();

    const btnDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    fireEvent.click(btnDrink);
    
    const searchBtn = await screen.findByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
    
    const searchNameRadio = await screen.findByTestId(/name-search-radio/i);
    fireEvent.click(searchNameRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: '155 Belmont'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const recipeTitle = await screen.findByTestId(/recipe-title/i);
    await waitFor(() => expect(recipeTitle).toBeInTheDocument(), {timeout: 2000});
    const { pathname } = history.location;
    await waitFor (() => expect(pathname).toBe('/drinks/15346'), {timeout: 2000});
  });

  test('6. Teste se o Header possui os ícones de perfil, de pesquisa e o título da página', async () => {
    renderWithRouterAndStore (<App />)
    login();

    const title = await screen.findByText(/foods/i);
    const profileBtn = screen.getByTestId(/profile-top-btn/i);
    const searchBtn = screen.getByRole('img', { name: 'search-button'});

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
  });

  test('7. Teste se ao digitar algo que não está na receita é acionado o alert', async () => {
    // const alertMock = jest.spyOn(window, "alert").mockImplementation();
    renderWithRouterAndStore (<App />)
    login();

    const btnFood = await screen.findByTestId(/food-bottom-btn/i);
    fireEvent.click(btnFood);

    const searchBtn =  screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
       
    const searchFirstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    fireEvent.click(searchFirstLetterRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'xablau'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    jest.spyOn(global, 'alert').mockImplementation(() => "Sorry, we haven't found any recipes for these filters.");
    expect(global.alert()).toBe("Sorry, we haven't found any recipes for these filters.")
    expect(global.alert).toHaveBeenCalledTimes(1);
  })

  test('8. Teste se ao pesquisar Z, selecionando o input First Letter, aparecerá a bebida Zorro', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/');
    login();

    const btnDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    fireEvent.click(btnDrink);

    const searchBtn =  screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
       
    const searchFirstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    fireEvent.click(searchFirstLetterRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'Z'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const drinkZorro = await screen.findByText(/Zorro/i);
    expect(drinkZorro).toBeInTheDocument();
  });

  test('9. Teste se ao pesquisar Orange, selecionando o input Ingredient, ira retornar bebidas que usam o ingrediente', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/');
    login();

    const btnDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    fireEvent.click(btnDrink);
    
    const searchBtn = await screen.findByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
    
    const searchIngredientRadio = screen.getByTestId(/ingredient-search-radio/i);
    fireEvent.click(searchIngredientRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'Orange'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    const drinkAbbey = await screen.findByText(/Abbey/i);
    await waitFor(() => expect(drinkAbbey).toBeInTheDocument(), {timeout: 2000});
  });

  test('10. Teste se ao pesquisar ZZ, selecionando o input First Letter, aparecerá a bebida Zorro', async () => {
    const { history } = renderWithRouterAndStore(<App />);
    history.push('/');
    login();

    const btnDrink = await screen.findByTestId(/drinks-bottom-btn/i);
    fireEvent.click(btnDrink);

    const searchBtn =  screen.getByTestId(/search-top-btn/i);
    fireEvent.click(searchBtn);
       
    const searchFirstLetterRadio = screen.getByTestId(/first-letter-search-radio/i);
    fireEvent.click(searchFirstLetterRadio);
    const searchInput = await screen.findByTestId(/search-input/i);
    fireEvent.change(searchInput, {target: {value: 'ZZ'}});

    const btnBuscar = await screen.findByTestId(/exec-search-btn/i);
    userEvent.click(btnBuscar);

    jest.spyOn(global, 'alert').mockImplementation(() => 'Your search must have only 1 (one) character');
    expect(global.alert()).toBe('Your search must have only 1 (one) character')
    expect(global.alert).toHaveBeenCalled();
  });
})
