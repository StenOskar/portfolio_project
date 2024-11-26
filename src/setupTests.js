// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// setupTests.js
HTMLCanvasElement.prototype.getContext = () => {
    return {
        clearRect: jest.fn(),
        fillRect: jest.fn(),
        fillStyle: jest.fn(),
        beginPath: jest.fn(),
        arc: jest.fn(),
        closePath: jest.fn(),
        fill: jest.fn(),
    };
};
