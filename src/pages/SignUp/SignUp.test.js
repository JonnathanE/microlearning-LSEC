import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from './Signup';

beforeEach(() => {
    render(<MemoryRouter><Signup /></MemoryRouter>)
})

describe('<Signup />', () => {

    test('CP01 render signup user', () => {
        screen.getByText('Email')
        screen.getByText('Password')
        screen.getByTestId('btnSubmit')
        screen.getByTestId('linkLogin')
    });

    test('CP02 input name change', () => {
        const inputPassword = screen.getByTestId('name')
        expect(inputPassword.value).toBe("");
        fireEvent.change(inputPassword, { target: { value: 'myname' } });
        expect(inputPassword.value).toBe('myname');
    });

    test('CP03 input email change', () => {
        const inputEmail = screen.getByTestId('email')
        expect(inputEmail.value).toBe("");
        fireEvent.change(inputEmail, { target: { value: 'jonathan@test.com' } });
        expect(inputEmail.value).toBe('jonathan@test.com');
    });

    test('CP04 input password change', () => {
        const inputPassword = screen.getByTestId('password')
        expect(inputPassword.value).toBe("");
        fireEvent.change(inputPassword, { target: { value: 'mypassword' } });
        expect(inputPassword.value).toBe('mypassword');
    });

});
