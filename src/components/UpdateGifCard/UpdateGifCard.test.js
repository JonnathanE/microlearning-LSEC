import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateGifCard from './UpdateGifCard';


beforeEach(() => {
    render(
        <MemoryRouter>
            <UpdateGifCard />
        </MemoryRouter>
    )
})

describe('<UpdateGifCard />', () => {

    test('CP59 renders content', () => {
        screen.getByText('Gif de la lengua de señas')
    });

});
