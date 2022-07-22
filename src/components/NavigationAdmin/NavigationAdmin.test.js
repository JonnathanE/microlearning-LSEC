import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import NavigationAdmin from './NavigationAdmin';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    render(<MemoryRouter><NavigationAdmin /></MemoryRouter>)
})

describe('<NavigationAdmin />', () => {

    test('CP32 renders content', () => {
        screen.getByText('PANEL ADMIN')
    });

});