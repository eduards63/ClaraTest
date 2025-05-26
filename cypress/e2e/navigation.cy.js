import InventoryPage from "../pages(POM)/inventoryPage";
import LoginPage from "../pages(POM)/loginPage";

// Test suite for navigation functionality in the inventory page
describe('Navigation test', () => {
    // Instantiate the LoginPage and InventoryPage Page Objects
    const loginPage = new LoginPage();
    const inventoryPage = new InventoryPage();

    // Before each test, visit the login page and perform a successful login
    beforeEach(() => {
        loginPage.visit(); // Navigate to the login page
        loginPage.submitLogin(Cypress.env('username'), Cypress.env('password')); // Perform login
    });

    // Test: Check if 6 products are displayed in the inventory
    it('Navigation through the product catalog', () => {
        inventoryPage.productCount(6); // Verify that 6 products are displayed
    });

    // Test: Sort products by price from low to high
    it('Sort Product by low to high', () => {
        inventoryPage.sortProduct('lohi'); // Sort products by price (low to high)
        cy.get('.inventory_item_price').first().should('contain', '$7.99'); // Verify the first product's price is $7.99
    });

    // Test: Open product details for a specific product
    it('Open product details', () => {
        inventoryPage.detailProduct('Sauce Labs Backpack'); // Open details for "Sauce Labs Backpack"
        cy.url().should('include', '/inventory-item.html?id=4'); // Verify the URL includes the product details page
    });
});