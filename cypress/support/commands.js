import 'cypress-file-upload';

Cypress.Commands.add('loginAdmin', ({ email, password }) => {
    cy.request('POST', 'http://localhost:5000/api/auth/signinadmin', {
        email,
        password
    }).then(response => {
        localStorage.setItem('user', JSON.stringify(response.body))
        localStorage.setItem('auth', JSON.stringify(1))
        cy.visit('http://localhost:3000/admin/dashboard')
    })
})

Cypress.Commands.add('createModule', ({ number, name }) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/api/module',
        headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
        },
        body: {
            number,
            name
        },
    })
})

Cypress.Commands.add('createLesson', ({ nameLesson }) => {

    // clear databases
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    // define user admin
    const admin = {
        name: 'jonnathan',
        email: 'jonnathan@gmail.com',
        password: '1234',
        roles: [
            'student',
            'admin'
        ]
    }
    // create a admin
    cy.request('POST', 'http://localhost:5000/api/auth/signup', admin)
    // login admin
    cy.loginAdmin({ email: admin.email, password: admin.password })
    // define a module
    const newModule = {
        number: 1,
        name: "Modulo Dos"
    }
    // create a module
    cy.createModule({ number: newModule.number, name: newModule.name })
    // go to create lesson page
    cy.get('[data-testid="nav-admin-list-lesson"] a').eq(1).click()
    // upload file to the input filed
    cy.get('input[type=file]').attachFile("charla.svg")
    // fill out the form
    cy.get('[data-testid="inputName"]').type(nameLesson)
    cy.get('select').select(1)
    // upload
    cy.get('input[value="Crear"]').click()
    cy.get('.swal2-success')
    cy.contains('¡Lección creado con éxito!')
    // go to dashboard
    cy.visit('http://localhost:3000/admin/dashboard')
})

Cypress.Commands.add('createMicro', ({ titleMicro }) => {
    // CREATE A MICROLEARNING
    // go to create microlearning page
    cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
    // upload file to the input filed
    cy.get('input[id="imageFile"]').attachFile("apple.jpg")
    cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
    // fill out the form
    cy.get('[data-testid="inputTitle"]').type(titleMicro)
    cy.get('select').select(1)
    // upload
    cy.get('input[value="Crear"]').click()
    cy.get('.swal2-success', { timeout: 60000 })
    cy.contains('¡Microcontenido creado con éxito!')

    // go to dashboard
    cy.visit('http://localhost:3000/admin/dashboard')
})

Cypress.Commands.add('createCard', ({ question, correctAnswer, wrongAnswer }) => {
    // CREATE A CARD
    // go to create card page
    cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
    // upload file to the input filed
    cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
    // fill out the form
    cy.get('[data-testid="inputQuestion"]').type(question)
    cy.get('[data-testid="inputCorrectAnswer"]').type(correctAnswer)
    cy.get('[data-testid="inputWrongAnswer"]').type(wrongAnswer)
    cy.get('select').select(1)
    // upload
    cy.get('input[value="Crear"]').click()
    cy.get('.swal2-success', { timeout: 60000 })
    cy.contains('¡Tarjeta creada con éxito!')

    // go to dashboard
    cy.visit('http://localhost:3000/admin/dashboard')
})

Cypress.Commands.add('createContent', ({ nameLesson }) => {

    // clear databases
    cy.request('POST', 'http://localhost:5000/api/testing/reset')
    // define user admin
    const admin = {
        name: 'jonnathan',
        email: 'jonnathan@gmail.com',
        password: '1234',
        roles: [
            'student',
            'admin'
        ]
    }
    // create a admin
    cy.request('POST', 'http://localhost:5000/api/auth/signup', admin)
    // login admin
    cy.loginAdmin({ email: admin.email, password: admin.password })
    // define a module
    const newModule = {
        number: 1,
        name: "Modulo Dos"
    }
    // create a module
    cy.createModule({ number: newModule.number, name: newModule.name })
    // go to create lesson page
    cy.get('[data-testid="nav-admin-list-lesson"] a').eq(1).click()
    // upload file to the input filed
    cy.get('input[type=file]').attachFile("charla.svg")
    // fill out the form
    cy.get('[data-testid="inputName"]').type(nameLesson)
    cy.get('select').select(1)
    // upload
    cy.get('input[value="Crear"]').click()
    cy.get('.swal2-success')
    cy.contains('¡Lección creado con éxito!')
    // go to dashboard
    cy.visit('http://localhost:3000/admin/dashboard')

    // CREATE A MICROLEARNING
    // go to create microlearning page
    cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
    // upload file to the input filed
    cy.get('input[id="imageFile"]').attachFile("apple.jpg")
    cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
    // fill out the form
    cy.get('[data-testid="inputTitle"]').type('Exmple')
    cy.get('select').select(1)
    // upload
    cy.get('input[value="Crear"]').click()
    cy.get('.swal2-success', { timeout: 60000 })
    cy.contains('¡Microcontenido creado con éxito!')

    // go to dashboard
    cy.visit('http://localhost:3000/admin/dashboard')
    // CREATE A CARD
    // go to create card page
    cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
    // upload file to the input filed
    cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
    // fill out the form
    cy.get('[data-testid="inputQuestion"]').type('Example Question')
    cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
    cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
    cy.get('select').select(1)
    // upload
    cy.get('input[value="Crear"]').click()
    cy.get('.swal2-success', { timeout: 60000 })
    cy.contains('¡Tarjeta creada con éxito!')

})