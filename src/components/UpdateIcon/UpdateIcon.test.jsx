import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import UpdateIcon from './UpdateIcon';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    render(<MemoryRouter><UpdateIcon /></MemoryRouter>)
})

describe('<UpdateIcon />', () => {

    test('CP34 renders content', () => {
        screen.getByText('Icono')
    });

});