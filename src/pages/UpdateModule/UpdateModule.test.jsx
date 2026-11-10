import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import UpdateModule from './UpdateModule';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><UpdateModule /></MemoryRouter>)
})

describe('<AddModules />', () => {

    test('CP20 renders content', () => {
        component.getByText('Modificar el módulo')
        component.getByText('Número de módulo')
        component.getByText('Nombre')
        component.getByText('Regresar')
        component.getByText('Actualizar')
    });

    test('CP21 input number change', () => {
        const inputNumber = component.getByTestId('inputNumber')
        expect(inputNumber.value).toBe("");
        fireEvent.change(inputNumber, { target: { value: 3 } });
        expect(inputNumber.value).toBe('3');
    });

    test('CP22 input name change', () => {
        const inputName = component.getByTestId('inputName')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: "Modulo 1" } });
        expect(inputName.value).toBe("Modulo 1");
    });

    test('CP23 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});

