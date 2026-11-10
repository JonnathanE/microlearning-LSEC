import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import ShowUsers from './ShowUsers';

const queryClient = new QueryClient()

beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <ShowUsers />
            </MemoryRouter>
        </QueryClientProvider>
    )
})

describe('<ShowUsers />', () => {

    test('CP28 render show users', () => {
        screen.getByText('Crear Módulo')
    });

});