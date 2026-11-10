import '@testing-library/jest-dom'
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ViewMicrolearning from './ViewMicrolearning';

let component

beforeEach(() => {
    component = render(<MemoryRouter><ViewMicrolearning /></MemoryRouter>)
})

describe('<ViewMicrolearning />', () => {

    test('CP42 renders content', () => {
        component.getByText('Ver información del Microcontenido')
    });

});
