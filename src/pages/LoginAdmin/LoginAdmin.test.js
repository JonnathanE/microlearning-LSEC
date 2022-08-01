import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginAdmin from './LoginAdmin';

beforeEach(() => {
    render(<MemoryRouter><LoginAdmin /></MemoryRouter>)
})

describe('<LoginAdmin />', () => {

    test('CP15 render login user', () => {
        screen.getByText('Email')
        screen.getByText('Password')
        screen.getByLabelText('iniciar sesion')
    });

    test('CP16 input email change', () => {
        const inputEmail = screen.getByLabelText('email')
        expect(inputEmail.value).toBe("");
        fireEvent.change(inputEmail, { target: { value: 'jonathan@test.com' } });
        expect(inputEmail.value).toBe('jonathan@test.com');
    });

    test('CP17 input password change', () => {
        const inputPassword = screen.getByLabelText('password')
        expect(inputPassword.value).toBe("");
        fireEvent.change(inputPassword, { target: { value: 'mypassword' } });
        expect(inputPassword.value).toBe('mypassword');
    });

});
