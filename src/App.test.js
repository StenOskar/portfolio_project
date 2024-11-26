import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

jest.mock('./components/AuroraBackground', () => () => <div data-testid="aurora-background" />);
jest.mock('./components/Gallery', () => ({ openModal }) => (
    <div data-testid="gallery">
      <button onClick={() => openModal('image-src.jpg')}>Open Modal</button>
    </div>
));
jest.mock('./components/Modal', () => ({ image, closeModal }) => (
    <div data-testid="modal">
      <img src={image} alt="Modal" />
      <button onClick={closeModal}>Close Modal</button>
    </div>
));

describe('App Component', () => {
  test('renders the welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to the Portfolio Assignment/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  test('renders AuroraBackground component', () => {
    render(<App />);
    const auroraBackground = screen.getByTestId('aurora-background');
    expect(auroraBackground).toBeInTheDocument();
  });

  test('renders Gallery component', () => {
    render(<App />);
    const gallery = screen.getByTestId('gallery');
    expect(gallery).toBeInTheDocument();
  });

  test('does not render Modal initially', () => {
    render(<App />);
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
  });

  test('opens and closes Modal when an image is clicked', () => {
    render(<App />);
    const openModalButton = screen.getByText('Open Modal');
    fireEvent.click(openModalButton);

    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(screen.getByAltText('Modal')).toHaveAttribute('src', 'image-src.jpg');

    const closeModalButton = screen.getByText('Close Modal');
    fireEvent.click(closeModalButton);

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
