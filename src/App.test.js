import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

/*
    Mocking the AuroraBackground, Gallery, and Modal components
 */
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

/*
  The test suite for the App component
 */
describe('App Component', () => {
  test('renders the welcome message', () => {
    render(<App />);
    const welcomeElement = screen.getByText(/Welcome to the Portfolio Assignment/i);
    expect(welcomeElement).toBeInTheDocument();
  });

  /*
    The test checks if the AuroraBackground component is rendered.
   */
  test('renders AuroraBackground component', () => {
    render(<App />);
    const auroraBackground = screen.getByTestId('aurora-background');
    expect(auroraBackground).toBeInTheDocument();
  });

  /*
    The test checks if the Gallery component is rendered.
   */
  test('renders Gallery component', () => {
    render(<App />);
    const gallery = screen.getByTestId('gallery');
    expect(gallery).toBeInTheDocument();
  });

  /*
    The test checks if the Modal component is not rendered initially.
   */
  test('does not render Modal initially', () => {
    render(<App />);
    const modal = screen.queryByTestId('modal');
    expect(modal).not.toBeInTheDocument();
  });

  /*
    The test checks if the Modal component is rendered when an image is clicked.
   */
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
