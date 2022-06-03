describe('Microlearning', () => {
    beforeEach(() => {
        cy.createLesson({ nameLesson: 'Frutas' })
    })

    it('CP29 create a microlearning', () => {
        cy.contains('PANEL ADMIN')
        // go to create microlearning page
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputTitle"]').type('Micro 01')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.get('.swal2-success', { timeout: 60000 })
        cy.contains('¡Microcontenido creado con éxito!')
    });

    it('CP30 the lesson is not created if you do not enter the image', () => {
        cy.contains('PANEL ADMIN')
        // go to create microlearning page
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
        // upload file to the input filed
        //cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputTitle"]').type('Micro 01')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('La imágen debe ser 9 MB')
        // cy.get('.swal2-success', { timeout: 60000 })
        // cy.contains('¡Microcontenido creado con éxito!')
    });

    it('CP31 the lesson is not created if you do not enter the gif', () => {
        cy.contains('PANEL ADMIN')
        // go to create microlearning page
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        //cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputTitle"]').type('Micro 01')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('El gif debe ser 9 MB')
        // cy.get('.swal2-success', { timeout: 60000 })
        // cy.contains('¡Microcontenido creado con éxito!')
    });

    it('CP32 the microlearning is not created if the title is not entered', () => {
        cy.contains('PANEL ADMIN')
        // go to create microlearning page
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        //cy.get('[data-testid="inputTitle"]').type('Micro 01')
        cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('El nombre de la lección es requerido')
        // cy.get('.swal2-success', { timeout: 60000 })
        // cy.contains('¡Microcontenido creado con éxito!')
    });

    it('CP33 the microlearning is not created if I do not select the lesson', () => {
        cy.contains('PANEL ADMIN')
        // go to create microlearning page
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(1).click()
        // upload file to the input filed
        cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // fill out the form
        cy.get('[data-testid="inputTitle"]').type('Micro 01')
        //cy.get('select').select(1)
        // upload
        cy.get('input[value="Crear"]').click()
        cy.contains('Debe de elegir un módulo')
        // cy.get('.swal2-success', { timeout: 60000 })
        // cy.contains('¡Microcontenido creado con éxito!')
    });

    it('CP34 list all microlearnings', () => {
        cy.createMicro({ titleMicro: "Micro 01" })
        // GO TO LIST ALL MICROLEARNING
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(0).click()
    });

    it('CP35 view info microlearning', () => {
        cy.createMicro({ titleMicro: "Micro 01" })
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(0).click()
        // go to update module page
        cy.get('tbody tr td:last a:first').click()
        cy.contains('Micro 01')
    });

    it('CP36 update info microlearning', () => {
        cy.createMicro({ titleMicro: "Micro 01" })
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(0).click()
        // go to update microlearning page
        cy.get('tbody tr td:last a:last').click()
        // fill out form
        cy.get('[data-testid="inputTitle"]').type('Micro 01')
        cy.get('select').select(1)
        // update
        cy.get('input[value="Actualizar"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success')
        cy.contains('¡El Microcontenido se actualizó correctamente!')
    });

    it('CP37 update gif microlearning', () => {
        cy.createMicro({ titleMicro: "Micro 01" })
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(0).click()
        // go to update microlearning page
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

    it('CP38 update image microlearning', () => {
        cy.createMicro({ titleMicro: "Micro 01" })
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(0).click()
        // go to update microlearning page
        cy.get('tbody tr td:last a:last').click()
        // fill out form
        cy.get('input[id="imageFile"]').attachFile("apple.jpg")
        //cy.get('input[id="gifFile"]').attachFile("Manzana.gif")
        // update
        cy.get('input[value="Actualizar Imagen"]').click()
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success', { timeout: 60000 })
        cy.contains('¡La imágen se actualizó correctamente!')
    });

    it.only('CP39 delete lesson', () => {
        cy.createMicro({ titleMicro: "Micro 01" })
        cy.contains('PANEL ADMIN')
        // go to list all lessons
        cy.get('[data-testid="nav-admin-list-micro"] a').eq(0).click()
        // click delete button
        cy.get('tbody tr td:last button:first').click()
        // delete confirm
        cy.get('.swal2-confirm').click()
        cy.get('.swal2-success', { timeout: 60000 })
        cy.contains('Su archivo ha sido eliminado')
    });

});