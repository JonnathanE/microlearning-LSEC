import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import UpdateMicrolearning from './UpdateMicrolearning';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><UpdateMicrolearning /></MemoryRouter>)
})

describe('<UpdateMicrolearning />', () => {

    test('CP39 renders content', () => {
        component.getByText('Título del Microcontenio')
        component.getByText('Lección')
        component.getByText('Actualizar Microcontenido')
        component.getByText('Gif de la lengua de señas')
        component.getByText('Imágen Representativa')
        component.getByText('Regresar')
        component.getByText('Actualizar')
    });

    test('CP40 input title change', () => {
        const inputName = component.getByTestId('inputTitle')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP41 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});
