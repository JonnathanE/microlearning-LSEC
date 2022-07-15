describe('Auth', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/')

        cy.request('POST', 'http://localhost:5000/api/testing/reset')

        const user = {
            name: 'gwen',
            email: 'gwen@gmail.com',
            password: '1234',
        }

        cy.request('POST', 'http://localhost:5000/api/auth/signup', user)
    })

    it('CP01 frontpage can be opened', () => {
        cy.contains('Aprende Lengua de Señas Ecuatoriana')
    });

    it('CP02 signup button in navbar can be opened', () => {
        cy.contains('Crear cuenta').click()
    });

    it('CP03 signup button in hero can be opened', () => {
        cy.contains('Crear tu cuenta hoy').click()
    });

    it('CP04 signup form can be opened', () => {
        cy.contains('Crear tu cuenta hoy').click()
        cy.get('input:first').type('damian')
        cy.get('input:last').type('damian@gmail.com')
        cy.get('input').eq(2).type('1234')
        cy.get('[data-testid="btnSubmit"]').click()
        cy.contains('damian')
    });

    it('CP05 signup fails with repeated email', () => {
        cy.contains('Crear tu cuenta hoy').click()
        cy.get('input:first').type('gwen')
        cy.get('input:last').type('gwen@gmail.com')
        cy.get('input').eq(2).type('1234')
        cy.get('[data-testid="btnSubmit"]').click()
        cy.contains('El correo electrónico ya existe')
    });

    it('CP06 signup fails with wrong email', () => {
        cy.contains('Crear tu cuenta hoy').click()
        cy.get('input:first').type('gwen')
        cy.get('input:last').type('gwengmail.com')
        cy.get('input').eq(2).type('1234')
        cy.get('[data-testid="btnSubmit"]').click()
        cy.contains('El correo electrónico debe ser un correo electrónico válido')
    });

    it('CP07 login button can be opened', () => {
        cy.contains('Iniciar Sesión').click()
    });

    it('CP08 login form can be opened', () => {
        cy.contains('Iniciar Sesión').click()
        cy.get('input:first').type('gwen@gmail.com')
        cy.get('input:last').type('1234')
        cy.get('[data-testid="form-login-button"]').click()
        cy.contains('gwen')
    });

    it('CP09 login fails with wrong password', () => {
        cy.contains('Iniciar Sesión').click()
        cy.get('input:first').type('gwen@gmail.com')
        cy.get('input:last').type('12345')
        cy.get('[data-testid="form-login-button"]').click()
        cy.contains('El correo electrónico o la contraseña no coinciden')
    });

    it('CP10 login fails with wrong email', () => {
        cy.contains('Iniciar Sesión').click()
        cy.get('input:first').type('gwen01@gmail.com')
        cy.get('input:last').type('1234')
        cy.get('[data-testid="form-login-button"]').click()
        cy.contains('El usuario con ese correo electrónico no existe')
    });

});

describe('Login Admin', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/admin/signin')

        cy.request('POST', 'http://localhost:5000/api/testing/reset')

        const admin = {
            name: 'jonnathan',
            email: 'jonnathan@gmail.com',
            password: '1234',
            roles: [
                'student',
                'admin'
            ]
        }

        cy.request('POST', 'http://localhost:5000/api/auth/signup', admin)
    })

    it('CP11 admin login form can be opened', () => {
        cy.get('input:first').type('jonnathan@gmail.com')
        cy.get('input:last').type('1234')
        cy.get('[data-testid="form-login-admin-button"]').click()
        cy.contains('jonnathan')
        cy.contains('PANEL ADMIN')
    });

    it('CP12 admin login fails with wrong password', () => {
        cy.get('input:first').type('jonnathan@gmail.com')
        cy.get('input:last').type('12345')
        cy.get('[data-testid="form-login-admin-button"]').click()
        cy.contains('El correo electrónico o la contraseña no coinciden')
    });

    it('CP13 login fails with wrong email', () => {
        cy.get('input:first').type('gwen@gmail.com')
        cy.get('input:last').type('1234')
        cy.get('[data-testid="form-login-admin-button"]').click()
        cy.contains('El correo electrónico o la contraseña no coinciden')
    });

});

describe('Cerrar sesión', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:5000/api/testing/reset')

        const admin = {
            name: 'jonnathan',
            email: 'jonnathan@gmail.com',
            password: '1234',
            roles: [
                'student',
                'admin'
            ]
        }

        cy.request('POST', 'http://localhost:5000/api/auth/signup', admin)

        cy.loginAdmin({ email: admin.email, password: admin.password })

        cy.visit('http://localhost:3000/learn')
    })

    it('CP55 cerrar sesion', () => {
        cy.contains('jonnathan')
        cy.get('ul').eq(1).click()
        cy.get('a[data-testid="navbar-user-cerrar-sesion"]').click()
        cy.contains('Iniciar Sesión')
    });

});