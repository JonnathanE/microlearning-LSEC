import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import AddMicrolearning from './AddMicrolearning';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><AddMicrolearning /></MemoryRouter>)
})

describe('<AddMicrolearning />', () => {

    test('CP36 renders content', () => {
        component.getByText('Título del Microcontenido')
        component.getByText('Lección')
        component.getByText('Selecciona una Lección')
        component.getByText('Imágen representativa')
        component.getByText('Gif')
        component.getByText('Regresar')
        component.getByText('Crear')
    });

    test('CP37 input title name change', () => {
        const inputName = component.getByTestId('inputTitle')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP38 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});