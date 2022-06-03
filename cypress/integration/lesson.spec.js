describe('Create Lesson', () => {
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

        const newModule = {
            number: 1,
            name: "Modulo Dos"
        }
        cy.createModule({ number: newModule.number, name: newModule.name })
    })

    it('CP21 create a lesson', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[type=file]').attachFile("charla.svg")
        // fill out the form
        cy.get('[data-testid="inputName"]').type('Frutas')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.get('.swal2-success')
        cy.contains('¡Lección creado con éxito!')
    });

    it('CP22 the lesson is not created if you do not enter the icon', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(1).click()
        // fill out the form
        cy.get('[data-testid="inputName"]').type('Frutas')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('El icono debe ser 1MB')
    });

    it('CP23 the lesson is not created if the name is not entered', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[type=file]').attachFile("charla.svg")
        // fill out the form
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('El nombre de la lección es requerido')
    });

    it('CP24 the lesson is not created if I do not select the module', () => {
        cy.contains('PANEL ADMIN')
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[type=file]').attachFile("charla.svg")
        // fill out the form
        cy.get('[data-testid="inputName"]').type('Frutas')
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('Debe de elegir un módulo')
    });

});

describe('Lesson', () => {
    beforeEach(() => {
        cy.createLesson({ nameLesson: 'Frutas' })
    })

    it('CP25 list all lessons', () => {
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(0).click()
    });

    it('CP26 view info lesson', () => {
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(0).click()
        // go to update module page
        cy.get('tbody tr td:last a:first').click()
        cy.contains('Frutas')
    });

    it('CP27 update lesson', () => {
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(0).click()
        // go to update module page
        cy.get('tbody tr td:last a:last').click()
        // fill out form
        cy.get('[data-testid="inputName"]').type('Lesson test')
        cy.get('select').select(1)
        // update
        cy.get('input[value="Actualizar"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
        cy.contains('¡La lección se actualizó correctamente!')
    });

    it('CP28 delete lesson', () => {
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-lesson"] a').eq(0).click()
        // click delete button
        cy.get('tbody tr td:last button:first').click()
        // delete confirm
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
        cy.contains('Su archivo ha sido eliminado')
    });

});

