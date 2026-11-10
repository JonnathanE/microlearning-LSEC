import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginUser from './LoginUser';

beforeEach(() => {
    render(<MemoryRouter><LoginUser /></MemoryRouter>)
})

describe('<LoginUser />', () => {

    test('CP05 render login user', () => {
        screen.getByText('Email')
        screen.getByText('Password')
        screen.getByLabelText('iniciar sesion')
        screen.getByTestId('linkRegister')
    });

    test('CP06 input email change', () => {
        const inputEmail = screen.getByLabelText('email')
        expect(inputEmail.value).toBe("");
        fireEvent.change(inputEmail, { target: { value: 'jonathan@test.com' } });
        expect(inputEmail.value).toBe('jonathan@test.com');
    });

    test('CP07 input password change', () => {
        const inputPassword = screen.getByLabelText('email')
        expect(inputPassword.value).toBe("");
        fireEvent.change(inputPassword, { target: { value: 'mypassword' } });
        expect(inputPassword.value).toBe('mypassword');
    });

});
