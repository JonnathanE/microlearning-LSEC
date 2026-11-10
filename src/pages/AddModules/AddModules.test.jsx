import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import AddModule from './AddModule';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><AddModule /></MemoryRouter>)
})

describe('<AddModules />', () => {

    test('CP08 renders content', () => {
        component.getByText('Crear nuevo módulo')
        component.getByText('Número de módulo')
        component.getByText('Nombre')
        component.getByText('Regresar')
        component.getByText('Crear')
    });

    test('CP09 input number change', () => {
        const inputNumber = component.getByLabelText('numero del modulo')
        expect(inputNumber.value).toBe("");
        fireEvent.change(inputNumber, { target: { value: 3 } });
        expect(inputNumber.value).toBe('3');
    });

    test('CP10 input name change', () => {
        const inputName = component.getByLabelText('nombre del modulo')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: "Modulo 1" } });
        expect(inputName.value).toBe("Modulo 1");
    });

    test('CP11 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});

