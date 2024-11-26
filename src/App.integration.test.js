import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('user can open an image in the modal from the gallery', () => {
    render(<App />);

    const galleryImage = screen.getByAltText('Gallery item 3');
    fireEvent.click(galleryImage.closest('.card'));

    const modalImage = screen.getByAltText('Modal');
    expect(modalImage).toBeInTheDocument();
    expect(modalImage).toHaveAttribute('src', expect.stringContaining('Japan1.jpg'));

    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);

    expect(screen.queryByAltText('Modal')).not.toBeInTheDocument();
});
