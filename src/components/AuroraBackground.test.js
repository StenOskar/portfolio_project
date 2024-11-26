import React from 'react';
import { render } from '@testing-library/react';
import AuroraBackground from './AuroraBackground';

test('renders AuroraBackground without crashing', () => {
    render(<AuroraBackground />);
});
