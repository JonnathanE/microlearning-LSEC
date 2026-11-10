import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LandingPage from './LandingPage';

let component

beforeEach(() => {
    component = render(
        <MemoryRouter>
            <LandingPage />
        </MemoryRouter>
    )
})

describe('<LandingPage />', () => {

    test('CP46 renders content', () => {
        component.getByText('Ahora de aprender algo nuevo')
    });

});
