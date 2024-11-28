// Sanity test for App component
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/*
    The app sanity test suite
 */
test('App renders without crashing', () => {
    render(<App />);
});
