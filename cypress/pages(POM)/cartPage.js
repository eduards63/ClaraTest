// Page Object Model for the Cart Page
class CartPage {
    // Define page elements as functions for dynamic access
    elements = {
        items: () => cy.get('.cart_item'), // All items in the cart
        buttonCheckout: () => cy.get('#checkout'), // Checkout button
    };

    // Method to assert that a specific product exists in the cart
    existItemsInCart(productName) {
        cy.contains('.cart_item', productName).should('exist');
    }

    // Method to click the checkout button
    clickCheckoutButton() {
        this.elements.buttonCheckout().click();
    }
}

export default CartPage;