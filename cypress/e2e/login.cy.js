import LoginPage from "../pages(POM)/loginPage";

// Test suite for login functionality
describe('Login Tests', () => {
  // Instantiate the LoginPage Page Object
  const loginPage = new LoginPage();

  // Runs before each test: navigates to the login page
  beforeEach(() => {
    loginPage.visit();
  });

  // Test: Successful login with valid credentials
  it('Login page successfully', () => {
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('username'), 
      Cypress.env('password')
    ); // Perform login
    cy.url().should('include', '/inventory.html'); // Verify successful navigation
  });

  // Test: Login attempt with invalid credentials
  it('Login with invalid credentials', () => {
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('username'), 
      Cypress.env('wrongPassword')
    ); // Attempt login with wrong password
    loginPage.errorMessage('Epic sadface: Username and password do not match any user in this service'); // Check error message
  });

  // Test: Login attempt with a locked out user
  it('Login with locked out user', () => {
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('lockedUsername'), 
      Cypress.env('password')
    ); // Attempt login with locked user
    loginPage.errorMessage('Epic sadface: Sorry, this user has been locked out.'); // Check error message
  });

  // Test: Login with a problem user and perform some actions
  it('Login with problem user', () => {
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('problemUsername'), 
      Cypress.env('password')
    ); // Login as problem user
    cy.url().should('include', '/inventory.html'); // Verify navigation
    // Check that the image is not the expected one
    cy.get('#item_4_img_link').should('not.be.a.equal', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
    // Add and remove item from cart
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').dblclick();
    cy.get('#remove-sauce-labs-backpack').should('be.contain', 'Remove');
  });

  // Test: Login with performance user and measure load time
  it('Login with performance user', () => {
    const startTime = performance.now();
    const loadTime = performance.now() - startTime;
    cy.log(`Time to load: ${loadTime.toFixed(0)} ms`); // Log load time
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('performanceUsername'), 
      Cypress.env('password')
    ); // Login as performance user
    // Log navigation performance metrics
    cy.window().then((win) => {
      const [entry] = win.performance.getEntriesByType('navigation');
      console.table({
        'Full Load': `${entry.loadEventEnd} ms`
      });
    });
    cy.url().should('include', '/inventory.html'); // Verify navigation
  });

  // Test: Login with error user and handle expected error
  it('Login with error user', () => {
    // Handle expected uncaught exception
    cy.on('uncaught:exception', (err) => {
      if (err.message.includes('Failed to remove item from cart')) {
        console.log('Expected Error:', err.message);
        return false; // Prevent Cypress from failing the test
      }
      return true; // Allow other errors to fail the test
    });
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('errorUsername'), 
      Cypress.env('password')
    ); // Login as error user
    cy.url().should('include', '/inventory.html'); // Verify navigation
    // Add and remove item from cart, check for correct button state
    cy.get('#item_4_img_link').should('not.be.a.equal', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
    cy.get('#add-to-cart-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').click();
    cy.get('#remove-sauce-labs-backpack').should('be.contain', 'Remove');
  });

  // Test: Login with visual user and check images
  it('Login with visual user', () => {
    cy.title().should('eq', 'Swag Labs'); // Check page title
    loginPage.submitLogin(
      Cypress.env('visualUsername'), 
      Cypress.env('password')
    ); // Login as visual user
    cy.url().should('include', '/inventory.html'); // Verify navigation
    // Check that the image is not the expected or error image
    cy.get('#item_4_img_link').should('not.be.a.equal', '/static/media/sauce-backpack-1200x1500.0a0b85a3.jpg');
    cy.get('#item_4_img_link').should('not.be.a.equal', '/static/media/sl-404.168b1cce.jpg');
  });

});