import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import AddLesson from './AddLesson';
import { MemoryRouter } from 'react-router-dom';

let component

beforeEach(() => {
    component = render(<MemoryRouter><AddLesson /></MemoryRouter>)
})

describe('<AddLesson />', () => {

    test('CP12 renders content', () => {
        component.getByText('Icono')
        component.getByText('Nombre de la lección')
        component.getByText('Módulo')
        component.getByText('Selecciona Módulo')
        component.getByText('Regresar')
        component.getByText('Crear')
    });

    test('CP13 input lesson name change', () => {
        const inputName = component.getByTestId('inputName')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP14 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});
