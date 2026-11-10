import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AddCard from './AddCard';

let component

beforeEach(() => {
    component = render(
        <MemoryRouter>
            <AddCard />
        </MemoryRouter>
    )
})

describe('<AddCard />', () => {

    test('CP48 renders content', () => {
        component.getByText('Pregunta')
        component.getByText('Lección')
        component.getByText('Selecciona una Lección')
        component.getByText('Restpuesta correcta')
        component.getByText('Respuesta incorrecta')
        component.getByText('Gif')
        component.getByText('Regresar')
        component.getByText('Crear')
    });

    test('CP49 input question change', () => {
        const inputName = component.getByTestId('inputQuestion')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP50 input CorrectAnswer change', () => {
        const inputName = component.getByTestId('inputCorrectAnswer')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP51 input WrongAnswer change', () => {
        const inputName = component.getByTestId('inputWrongAnswer')
        expect(inputName.value).toBe("");
        fireEvent.change(inputName, { target: { value: 'Name' } });
        expect(inputName.value).toBe('Name');
    });

    test('CP52 clicking the button regresar', () => {
        const btnCrear = component.getByText('Regresar')
        fireEvent.click(btnCrear)
    });

});