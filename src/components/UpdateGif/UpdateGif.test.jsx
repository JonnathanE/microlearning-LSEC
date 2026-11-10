import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateGif from './UpdateGif';

let component

beforeEach(() => {
    component = render(
        <MemoryRouter>
            <UpdateGif />
        </MemoryRouter>
    )
})

describe('<UpdateGif />', () => {

    test('CP43 renders content', () => {
        component.getByText('Gif de la lengua de señas')
    });

});
