import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndStore } from '../testConfig';
import DoneRecipes from '../pages/DoneRecipes';
import userEvent from '@testing-library/user-event';
import App from '../App';

const doneRecipes = [
  {
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot:  'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));

describe('Testa página de Done Recipes', () => {
  it('Testa click no nome do item food e se é redirecionado à pagina correta', () => {
    const { history } = renderWithRouterAndStore(<DoneRecipes/>);
    const tags1 = screen.getByText(/pasta/i);
    const tags2 = screen.getByText(/curry/i);
    expect(tags1).toBeInTheDocument();
    expect(tags2).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /food/i})).toBeInTheDocument();
    const buttonName = screen.getByText(/spicy arrabiata penne/i);
    userEvent.click(buttonName);
    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa click no nome do item drink e se é redirecionado à pagina correta', () => {
    const { history } = renderWithRouterAndStore(<DoneRecipes/>);
    expect(screen.getByRole('heading', { name: /done recipes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /drink/i})).toBeInTheDocument();
    const buttonNameDrink = screen.getByText(/aquamarine/i);
    userEvent.click(buttonNameDrink);
    expect(history.location.pathname).toBe('/drinks/178319');
  });

  it('Testa o click no botão de compartilhar receita drinks e foods', () => {
    jest.spyOn(navigator.clipboard, "writeText");
  
    renderWithRouterAndStore(<DoneRecipes/>);
    const shareButtonFood = screen.getByTestId('0-horizontal-share-btn');
    const shareButtonDrink = screen.getByTestId('1-horizontal-share-btn');
    userEvent.click(shareButtonDrink);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/drinks/178319");
    jest.clearAllMocks();
    userEvent.click(shareButtonFood);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/foods/52771");
  });

  it('Testa os botão de filtro Food', () => {
    renderWithRouterAndStore(<DoneRecipes/>);
    const drinkItem = screen.getByText(/aquamarine/i);
    const filterFood = screen.getByRole('button', {
      name: /food/i
    });
    userEvent.click(filterFood);
    expect(drinkItem).not.toBeInTheDocument();
  })

  it('Testa os botão de filtro Drink', () => {
    renderWithRouterAndStore(<DoneRecipes/>);
    const foodItem = screen.getByText(/spicy arrabiata penne/i);
    const filterDrink = screen.getByRole('button', {
      name: /drink/i
    });
    userEvent.click(filterDrink);
    expect(foodItem).not.toBeInTheDocument();
  })

  it('Testa os botão de filtro All', () => {
    renderWithRouterAndStore(<DoneRecipes/>);
    const drinkItem = screen.getByText(/aquamarine/i);
    const foodItem = screen.getByText(/spicy arrabiata penne/i);
    const filterDrink = screen.getByRole('button', {
      name: /all/i
    });
    userEvent.click(filterDrink);
    expect(foodItem).toBeInTheDocument();
    expect(drinkItem).toBeInTheDocument();
  })
})