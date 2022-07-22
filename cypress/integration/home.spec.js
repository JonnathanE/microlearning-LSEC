describe('Learn', () => {
    beforeEach(() => {
        cy.createContent({ nameLesson: 'Frutas' })
        cy.visit('http://localhost:3000/learn')
    })

    it('CP51 list microlearning in the user interfaz', () => {
        cy.contains('Frutas')
    });

    it('CP52 Login to the learn page', () => {
        cy.contains('Frutas')
        cy.get('button[data-testid="btn-user-learn"]').click()
    });

    it('CP53 Login to the practice page', () => {
        cy.contains('Frutas')
        cy.get('button[data-testid="btn-user-practice"]').click()
    });

});

describe('Progress', () => {
    beforeEach(() => {
        cy.createContent({ nameLesson: 'Frutas' })
        cy.visit('http://localhost:3000/learn/progress')
    })

    it('CP54 view lesson progress', () => {
        cy.contains('Frutas')
    });

});