import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import ShowMicrolearning from './ShowMicrolearning';

const queryClient = new QueryClient()

beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <ShowMicrolearning />
            </MemoryRouter>
        </QueryClientProvider>
    )
})

describe('<ShowMicrolearning />', () => {

    test('CP35 render show microlearning', () => {
        screen.getByText('Crear Módulo')
    });

});