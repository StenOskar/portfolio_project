import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';

test('renders portfolio assignment welcome message', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to the portfolio assignment/i);
  expect(welcomeElement).toBeInTheDocument();
});
