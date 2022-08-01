import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import Home from './Home';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient()

beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        </QueryClientProvider>
    )
})

describe('<Home />', () => {

    test('CP30 renders content', () => {
        screen.getByText('Iniciar Sesión')
    });

});