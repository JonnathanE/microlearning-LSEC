import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import ShowModules from './ShowModules';

const queryClient = new QueryClient()

beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <ShowModules />
            </MemoryRouter>
        </QueryClientProvider>
    )
})

describe('<ShowModules />', () => {

    test('CP18 render show modules', () => {
        screen.getByText('Crear Módulo')
    });

});