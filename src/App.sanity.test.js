// Sanity test for App component
import React from 'react';
import { render, screen, fireEvent  } from '@testing-library/react';
import App from './App';
import Gallery from './components/Gallery';

/*
    The app smoke/sanity test suite
 */
test('App renders without crashing', () => {
    render(<App />);
});

test('Gallery renders all images', () => {
    const openModalMock = jest.fn();
    render(<Gallery openModal={openModalMock} />);
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(5);
});

test('Modal opens and displays image when gallery image is clicked', () => {
    render(<App />);
    const galleryImage = screen.getByAltText('Gallery item 1');
    fireEvent.click(galleryImage.closest('.card'));
    const modalImage = screen.getByAltText('Modal');
    expect(modalImage).toBeInTheDocument();
    expect(modalImage).toHaveAttribute('src', expect.any(String));
});