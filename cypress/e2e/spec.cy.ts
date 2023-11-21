describe('Pruebas E2E para TeLlevoAPP', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.wait(5000);
  });

  it('Ingreso de Usuario', () => {
    cy.get('[data-cy=username-input]').type('juan.perez@duocuc.cl');
    cy.get('[data-cy=password-input]').type('juanperez');
    cy.contains('Ingresar').click();

    cy.url().should('include', '/home');
  });

  it('Restablecer Contraseña', () => {
    cy.visit('/recuperar');

    cy.get('[data-cy=email-input]').type('juan.perez@duocuc.cl');
    cy.contains('Recuperar').click();

    cy.url().should('include', '/login');
  });

  it('El chofer ingresa las opciones para el viaje y se crea el viaje', () => {
    cy.visit('/login');

    cy.get('[data-cy=username-input]').type('juan.perez@duocuc.cl');
    cy.get('[data-cy=password-input]').type('juanperez');
    cy.contains('Ingresar').click();

    cy.url().should('include', '/home');

    cy.get('.user-type', { timeout: 10000 }).should('have.text', 'Chofer');

    cy.window().then(win => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const time = `${hours}:${minutes}`;
    
      const datetimeElement = win.document.querySelector('ion-datetime');
      
      if (datetimeElement) {
        datetimeElement.componentOnReady().then((datetime) => {
          datetime.value = time;
        });
      }
    });

    cy.get('#precioPorPersona').type('2500');

    cy.contains('Programar Viaje').click(); 

  });
});