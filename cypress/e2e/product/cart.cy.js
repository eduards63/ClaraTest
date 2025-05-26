import InventoryPage from "../../pages(POM)/inventoryPage";
import LoginPage from "../../pages(POM)/loginPage";
import CartPage from "../../pages(POM)/cartPage";

// Test suite for cart functionality
describe('Cart Tests', () => {
    // Instantiate Page Object Models for each page involved in cart actions
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();

    // Before each test, perform a successful login
    beforeEach(() => {
        //loginPage.visit();
        loginPage.submitLogin(Cypress.env('username'), Cypress.env('password'));
    });

    // Test: Add an item to the cart and verify it exists in the cart
    it('Add item to cart', () => {
        inventoryPage.addCart('Sauce Labs Backpack'); // Add item to cart
        inventoryPage.goCart(); // Navigate to cart
        cartPage.existItemsInCart('Sauce Labs Backpack'); // Verify item exists in cart
    });

    // Test: Remove an item from the cart and verify it no longer exists
    it('Should remove a product from cart', () => {
        inventoryPage.addCart('Sauce Labs Bike Light'); // Add item to cart
        inventoryPage.goCart(); // Navigate to cart
        cartPage.existItemsInCart('Sauce Labs Bike Light'); // Verify item exists in cart
        inventoryPage.removeCart('Sauce Labs Bike Light'); // Remove item from cart
        cy.contains('Sauce Labs Bike Light').should('not.exist'); // Verify item is removed
     });
     
});