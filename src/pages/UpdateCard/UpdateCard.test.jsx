import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import UpdateCard from './UpdateCard';

let component

beforeEach(() => {
    component = render(
        <MemoryRouter>
            <UpdateCard />
        </MemoryRouter>
    )
})

describe('<UpdateCard />', () => {

    test('CP53 renders content', () => {
        component.getByText('Pregunta')
        component.getByText('Lección')
        component.getByText('Restpuesta correcta')
        component.getByText('Respuesta incorrecta')
        component.getByText('Gif de la lengua de señas')
        component.getByText('Regresar')
        component.getByText('Actualizar')
    });

    test('CP54 input question change', () => {
        const inputName = component.getByTestId('inputQuestion')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP55 input CorrectAnswer change', () => {
        const inputName = component.getByTestId('inputCorrectAnswer')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP56 input WrongAnswer change', () => {
        const inputName = component.getByTestId('inputWrongAnswer')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP57 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});