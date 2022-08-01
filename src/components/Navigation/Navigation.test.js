import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import Navigation from './Navigation';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    render(<MemoryRouter><Navigation /></MemoryRouter>)
})

describe('<Navigation />', () => {

    test('CP33 renders content', () => {
        screen.getByText('Aprende LSEC')
    });

});