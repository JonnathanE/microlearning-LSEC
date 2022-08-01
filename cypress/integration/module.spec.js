describe('Module', () => {
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
    })

    it('CP14 create a model', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-module"] a').eq(1).click()
        cy.get('input:first').type(1)
        cy.get('input:last').type('Modulo Uno')
        cy.get('input[value="Crear"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
    });

    it('CP15 create module fails because it does not enter a number in input', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-module"] a').eq(1).click()
        cy.get('input').eq(1).type('Modulo Uno')
        cy.get('input[value="Crear"]').click()
        cy.contains('number must be a `number` type, but the final value was: `NaN` (cast from the value `""`')
    });

    it('CP16 create module fails because it does not enter a name in input', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-module"] a').eq(1).click()
        cy.get('input').eq(0).type(1)
        cy.get('input[value="Crear"]').click()
        cy.contains('Requiere que ingrese un nombre para el módulo')
    });

    it('CP17 create module fails because it has a repeating number', () => {
        const newModule = {
            number: 1,
            name: "Modulo Dos"
        }
        cy.createModule({ number: newModule.number, name: newModule.name })
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-module"] a').eq(1).click()
        cy.get('input:first').type(1)
        cy.get('input:last').type('Modulo Dos')
        cy.get('input[value="Crear"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-error')
        cy.contains('El módulo ya está creado')
    });

    it('CP18 list all modules', () => {
        const newModule = {
            number: 1,
            name: "Modulo Dos"
        }
        cy.createModule({ number: newModule.number, name: newModule.name })
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-module"] a').eq(0).click()
    });

    it('CP19 update info modules', () => {
        // define a module
        const newModule = {
            number: 1,
            name: "Modulo Dos"
        }
        // create a module
        cy.createModule({ number: newModule.number, name: newModule.name })
        cy.contains('PANEL ADMIN')
        // go to list all modules
        cy.get('[data-testid="nav-admin-list-module"] a').eq(0).click()
        // go to update module page
        cy.get('tbody tr td:last a').click()
        cy.contains(newModule.name)
        // fill out form
        cy.get('[data-testid="inputNumber"]').type(2)
        cy.get('[data-testid="inputName"]').type('Modulo Tres')
        // update
        cy.get('input[value="Actualizar"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
        cy.contains('¡Módulo actualizado con éxito!')
    });

    it('CP20 delete modules', () => {
        const newModule = {
            number: 1,
            name: "Modulo Dos"
        }
        cy.createModule({ number: newModule.number, name: newModule.name })
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-module"] a').eq(0).click()
        cy.get('tbody tr td:last button:first').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
        cy.contains('Su archivo ha sido eliminado')
    });

});
