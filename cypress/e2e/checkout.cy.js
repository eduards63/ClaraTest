import InventoryPage from "../pages(POM)/inventoryPage";
import LoginPage from "../pages(POM)/loginPage";
import CartPage from "../pages(POM)/cartPage";
import CheckoutPage from "../pages(POM)/checkoutPage";

// Test suite for the checkout process
describe('Checkout Tests', () => {
    // Instantiate Page Object Models for each page involved in the checkout flow
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();
    const cartPage = new CartPage();
    const checkoutPage = new CheckoutPage();

    // Before each test, perform a successful login
    beforeEach(() => {
        loginPage.submitLogin(Cypress.env('username'), Cypress.env('password'));
    });

    // Test: Add items to cart and navigate to checkout page
    it('Checkout with items in cart', () => {
        inventoryPage.addCart('Sauce Labs Backpack'); // Add first item to cart
        inventoryPage.addCart('Sauce Labs Bike Light'); // Add second item to cart
        inventoryPage.goCart(); // Navigate to cart page
        cartPage.clickCheckoutButton(); // Click checkout button
        cy.url().should('include', '/checkout-step-one.html'); // Verify navigation to checkout step one
    });

    // Test: Complete the entire checkout process
    it('Complete checkout process', () => {
        cy.fixture('test').then((userData) => {
            const user = userData[0];
            inventoryPage.addCart('Sauce Labs Backpack'); // Add item to cart
            inventoryPage.goCart(); // Navigate to cart page
            cartPage.clickCheckoutButton(); // Click checkout button
            checkoutPage.fillCheckout(user.name, user.email, user.cp); // Fill in checkout form with fixture data
            checkoutPage.continueButtons(); // Continue to next step
            cy.url().should('include', '/checkout-step-two.html'); // Verify navigation to review step
            checkoutPage.finishButton(); // Complete the purchase
            cy.url().should('include', '/checkout-complete.html'); // Verify navigation to completion page
            checkoutPage.ordenSuccess(); // Verify order success message
        });
    });
});