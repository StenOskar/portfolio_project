import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal Component', () => {
    test('renders the modal with the correct image', () => {
        const closeModalMock = jest.fn();
        render(<Modal image="test-image.jpg" closeModal={closeModalMock} />);

        const modalImage = screen.getByAltText('Modal');
        expect(modalImage).toBeInTheDocument();
        expect(modalImage).toHaveAttribute('src', 'test-image.jpg');
    });

    test('calls closeModal when the close button is clicked', () => {
        const closeModalMock = jest.fn();
        render(<Modal image="test-image.jpg" closeModal={closeModalMock} />);

        const closeButton = screen.getByText('×');
        fireEvent.click(closeButton);

        expect(closeModalMock).toHaveBeenCalledTimes(1);
    });
});
