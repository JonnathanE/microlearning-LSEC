import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateImage from './UpdateImage';

let component

beforeEach(() => {
    component = render(
        <MemoryRouter>
            <UpdateImage />
        </MemoryRouter>
    )
})

describe('<UpdateImage />', () => {

    test('CP44 renders content', () => {
        component.getByText('Imágen Representativa')
    });

});
