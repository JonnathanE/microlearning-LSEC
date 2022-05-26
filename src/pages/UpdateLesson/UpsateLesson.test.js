import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import UpdateLesson from './UpdateLesson';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><UpdateLesson /></MemoryRouter>)
})

describe('<UpdateLesson />', () => {

    test('CP24 renders content', () => {
        component.getByText('Icono')
        component.getByText('Nombre de la lección')
        component.getByText('Módulo')
        component.getByText('Módulo')
        component.getByText('Regresar')
        component.getByText('Actualizar')
    });

    test('CP25 input lesson name change', () => {
        const inputName = component.getByTestId('inputName')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP26 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});
