import React from 'react';
import { render, screen } from '@testing-library/react';
import Gallery from './Gallery';

/*
    The Gallery test suite
 */
describe('Gallery Component', () => {
    test('renders gallery images', () => {
        const openModalMock = jest.fn();
        render(<Gallery openModal={openModalMock} />);

        const images = screen.getAllByRole('img');
        expect(images).toHaveLength(5);

        images.forEach((image, index) => {
            expect(image).toHaveAttribute('src');
            expect(image).toHaveAttribute('alt', `Gallery item ${index + 1}`);
        });
    });

    test('calls openModal with correct image source when an image is clicked', () => {
        const openModalMock = jest.fn();
        render(<Gallery openModal={openModalMock} />);

        const image = screen.getByAltText('Gallery item 2');
        image.closest('.card').click();

        expect(openModalMock).toHaveBeenCalledWith(expect.stringContaining('Japan2.jpg'));
    });
});
