// Page Object Model for the Checkout Page
class ChechoutPage {
    // Define page elements as functions for dynamic access
    elements = {
        name: () => cy.get('#first-name'), // First name input field
        lastName: () => cy.get('#last-name'), // Last name input field
        pc: () => cy.get('#postal-code'), // Postal code input field
        continueButton: () => cy.get('#continue'), // Continue button
        errorMessage: () => cy.get('[data-test="error"]'), // Error message element
        finishButton: () => cy.get('#finish'), // Finish button
        orderComplete: () => cy.get('.complete-header'), // Order complete message element
    };

    // Method to fill in the checkout form with user data
    fillCheckout(name, lastName, pc) {
        this.elements.name().type(name);
        this.elements.lastName().type(lastName);
        this.elements.pc().type(pc);
    }

    // Method to click the continue button
    continueButtons() {
        this.elements.continueButton().click();
    }

    // Method to click the finish button
    finishButton() {
        this.elements.finishButton().click();
    }

    // Method to assert that the order was completed successfully
    ordenSuccess() {
        this.elements.orderComplete().should('contain.text', 'Thank you for your order!');
    }
}

export default ChechoutPage;