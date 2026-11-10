import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import ViewLesson from './ViewLesson';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><ViewLesson /></MemoryRouter>)
})

describe('<ViewLesson />', () => {

    test('CP27 renders content', () => {
        component.getByText('Ver información de la lección')
    });

});
