import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import NotFoundPage from './NotFoundPage';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    render(<MemoryRouter><NotFoundPage /></MemoryRouter>)
})

describe('<NotFoundPage />', () => {

    test('CP29 renders content', () => {
        screen.getByText('Error 404')
    });

});