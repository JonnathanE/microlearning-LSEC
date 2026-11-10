import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewKnowledgeCard from './ViewKnowledgeCard';


beforeEach(() => {
    render(
        <MemoryRouter>
            <ViewKnowledgeCard />
        </MemoryRouter>
    )
})

describe('<ViewKnowledgeCard />', () => {

    test('CP58 renders content', () => {
        screen.getByText('Ver información de la Tarjeta de Aprendizaje')
    });

});