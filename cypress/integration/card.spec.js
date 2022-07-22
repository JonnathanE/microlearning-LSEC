describe('Card', () => {
    beforeEach(() => {
        cy.createLesson({ nameLesson: 'Frutas' })
    })

    it('CP40 create a card', () => {
        cy.contains('PANEL ADMIN')
        // go to create card page
        cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputQuestion"]').type('Card 01')
        cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.get('.swal2-success', { timeout: 60000 })
        cy.contains('¡Tarjeta creada con éxito!')
    });

    it('CP41 the card is not created if you do not enter the gif', () => {
        cy.contains('PANEL ADMIN')
        // go to create card page
        cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
        // upload file to the input filed
        //cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputQuestion"]').type('Card 01')
        cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('El gif debe ser 9 MB')
    });

    it('CP42 the card is not created if the question is not entered', () => {
        cy.contains('PANEL ADMIN')
        // go to create card page
        cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        //cy.get('[data-testid="inputQuestion"]').type('Card 01')
        cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('Necesita ingrear una pregunta de la tarjeta')
    });

    it('CP43 the card is not created if the correct answer is not entered', () => {
        cy.contains('PANEL ADMIN')
        // go to create card page
        cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputQuestion"]').type('Card 01')
        //cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('Debe de ingresar la respuesta correcta a evaluar')
    });

    it('CP44 the card is not created if the wrong answer is not entered', () => {
        cy.contains('PANEL ADMIN')
        // go to create card page
        cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputQuestion"]').type('Card 01')
        cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        //cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('Debe de ingresar una respuesta incorrecta o alterantiva')
    });

    it('CP45 the card is not created if I do not select the lesson', () => {
        cy.contains('PANEL ADMIN')
        // go to create card page
        cy.get('[data-testid="nav-admin-list-card"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputQuestion"]').type('Card 01')
        cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        //cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('Debe de elegir la lección a la que pertenece')
    });

    it('CP46 list all cards', () => {
        cy.createCard({ question: 'Question 01', correctAnswer: 'Manzana', wrongAnswer: 'Pera' })
        // GO TO LIST ALL MICROLEARNING
        cy.contains('PANEL ADMIN')
        // go to list all cards
        cy.get('[data-testid="nav-admin-list-card"] a').eq(0).click()
    });

    it('CP47 view info card', () => {
        cy.createCard({ question: 'Question 01', correctAnswer: 'Manzana', wrongAnswer: 'Pera' })
        cy.contains('PANEL ADMIN')
        // go to list all cards
        cy.get('[data-testid="nav-admin-list-card"] a').eq(0).click()
        // go to update module page
        cy.get('tbody tr td:last a:first').click()
        cy.contains('Question 01')
    });

    it('CP48 update info card', () => {
        cy.createCard({ question: 'Question 01', correctAnswer: 'Manzana', wrongAnswer: 'Pera' })
        cy.contains('PANEL ADMIN')
        // go to list all cards
        cy.get('[data-testid="nav-admin-list-card"] a').eq(0).click()
        // go to update card page
        cy.get('tbody tr td:last a:last').click()
        // fill out form
        cy.get('[data-testid="inputQuestion"]').type('Card 01')
        cy.get('[data-testid="inputCorrectAnswer"]').type('Manzana')
        cy.get('[data-testid="inputWrongAnswer"]').type('Pera')
        cy.get('select').select(1)
        // update
        cy.get('input[value="Actualizar"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
        cy.contains('¡La tarjeta se actualizó correctamente!')
    });

    it('CP49 update gif card', () => {
        cy.createCard({ question: 'Question 01', correctAnswer: 'Manzana', wrongAnswer: 'Pera' })
        cy.contains('PANEL ADMIN')
        // go to list all cards
        cy.get('[data-testid="nav-admin-list-card"] a').eq(0).click()
        // go to update card page
        cy.get('tbody tr td:last a:last').click()
        // fill out form
        //cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // update
        cy.get('input[value="Actualizar Gif"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success', { timeout: 60000 })
        cy.contains('¡El Gif se actualizó correctamente!')
    });

    it('CP50 delete card', () => {
        cy.createCard({ question: 'Question 01', correctAnswer: 'Manzana', wrongAnswer: 'Pera' })
        cy.contains('PANEL ADMIN')
        // go to list all cards
        cy.get('[data-testid="nav-admin-list-card"] a').eq(0).click()
        // click delete button
        cy.get('tbody tr td:last button:first').click()
        // delete confirm
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success', { timeout: 60000 })
        cy.contains('Su archivo ha sido eliminado')
    });

});