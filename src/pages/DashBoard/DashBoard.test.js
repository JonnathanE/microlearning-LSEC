import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import DashBoard from './DashBoard';
import { MemoryRouter } from 'react-router-dom';

beforeEach(() => {
    render(<MemoryRouter><DashBoard /></MemoryRouter>)
})

describe('<DashBoard />', () => {

    test('CP31 renders content', () => {
        screen.getByText('Gestión de Módulos')
    });

});