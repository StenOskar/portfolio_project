import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import Header from './Header';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders header with title', () => {
  render(<Header />);
  const headerElement = screen.getByText(/Your Header Title/i);
  expect(headerElement).toBeInTheDocument();
});