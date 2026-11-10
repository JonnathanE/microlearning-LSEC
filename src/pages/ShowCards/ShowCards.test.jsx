import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import ShowCards from './ShowCards';

const queryClient = new QueryClient()

beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <ShowCards />
            </MemoryRouter>
        </QueryClientProvider>
    )
})

describe('<ShowCards />', () => {

    test('CP47 render show card', () => {
        screen.getByText('Crear Módulo')
    });

});