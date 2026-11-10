import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query';
import ShowLessons from './ShowLessons';

const queryClient = new QueryClient()

beforeEach(() => {
    render(
        <QueryClientProvider client={queryClient}>
            <MemoryRouter>
                <ShowLessons />
            </MemoryRouter>
        </QueryClientProvider>
    )
})

describe('<ShowLessons />', () => {

    test('CP19 render show lessons', () => {
        screen.getByText('Crear Módulo')
    });

});