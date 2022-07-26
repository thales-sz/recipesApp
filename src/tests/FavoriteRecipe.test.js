import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndStore } from '../testConfig';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';

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

Object.assign(navigator, {
  clipboard: {
    writeText: () => {},
  },
});

localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

describe('Testa página de Favorite Recipes', () => {
  it('Testa click no nome do item food e se é redirecionado à pagina correta', () => {
    const { history } = renderWithRouterAndStore(<FavoriteRecipes/>);
    expect(screen.getByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /food/i})).toBeInTheDocument();
    const buttonName = screen.getByText(/spicy arrabiata penne/i);
    userEvent.click(buttonName);
    expect(history.location.pathname).toBe('/foods/52771');
  });

  it('Testa click no nome do item drink e se é redirecionado à pagina correta', () => {
    const { history } = renderWithRouterAndStore(<FavoriteRecipes/>);
    expect(screen.getByRole('heading', { name: /favorite recipes/i })).toBeInTheDocument();
    expect(screen.getByRole('img', {name: /drink/i})).toBeInTheDocument();
    const buttonNameDrink = screen.getByText(/aquamarine/i);
    userEvent.click(buttonNameDrink);
    expect(history.location.pathname).toBe('/drinks/178319');
  });

   it('Testa o click no botão de compartilhar receita drinks e foods', () => {
     jest.spyOn(navigator.clipboard, "writeText");
  
     renderWithRouterAndStore(<FavoriteRecipes/>);
     const shareButtonFood = screen.getByTestId('0-horizontal-share-btn');
     const shareButtonDrink = screen.getByTestId('1-horizontal-share-btn');
     userEvent.click(shareButtonDrink);
     expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/drinks/178319");
     jest.resetAllMocks();
     userEvent.click(shareButtonFood);
     expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost:3000/foods/52771");
   });

   it('Testa o botão de filtro Food', () => {
     renderWithRouterAndStore(<FavoriteRecipes/>);
     const drinkItem = screen.getByText(/aquamarine/i);
     const filterFood = screen.getByRole('button', {
       name: /food/i
     });
     userEvent.click(filterFood);
     expect(drinkItem).not.toBeInTheDocument();
   })

   it('Testa o botão de filtro Drink', () => {
     renderWithRouterAndStore(<FavoriteRecipes/>);
     const foodItem = screen.getByText(/spicy arrabiata penne/i);
     const filterDrink = screen.getByRole('button', {
       name: /drink/i
     });
     userEvent.click(filterDrink);
     expect(foodItem).not.toBeInTheDocument();
   })

   it('Testa o botão de filtro All', () => {
     renderWithRouterAndStore(<FavoriteRecipes/>);
     const drinkItem = screen.getByText(/aquamarine/i);
     const foodItem = screen.getByText(/spicy arrabiata penne/i);
     const filterDrink = screen.getByRole('button', {
       name: /all/i
     });
     userEvent.click(filterDrink);
     expect(foodItem).toBeInTheDocument();
     expect(drinkItem).toBeInTheDocument();
   })

   it('Testa o botão de favoritar', () => {
    renderWithRouterAndStore(<FavoriteRecipes/>);
    const favButton = screen.getByTestId('0-horizontal-favorite-btn');
    expect(favButton).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(favButton);
    expect(favButton).not.toBeInTheDocument();
  })

  it('Testa o botão de favoritar', () => {
    renderWithRouterAndStore(<FavoriteRecipes/>);
    const fav1Button = screen.getByTestId('1-horizontal-favorite-btn');
    expect(fav1Button).toHaveAttribute('src', 'blackHeartIcon.svg');
    userEvent.click(fav1Button);
    expect(fav1Button).not.toBeInTheDocument();
  });
  
})
