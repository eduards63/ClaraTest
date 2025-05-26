// Import the Page Object Model for Login page
import LoginPage from "../../pages(POM)/loginPage";

// Describe block for grouping login tests with fixture data
describe('Login test with Fixture Data', () => {
  // Initialize LoginPage instance
  const loginPage = new LoginPage();

  // Before each test, visit the login page
  beforeEach(() => {
    loginPage.visit();
  });

  // Test case to handle multiple login scenarios
  it('Handle multiple login scenarios', () => {
    // Initialize LoginPage with English translations
    const loginPage = new LoginPage('en');
    
    // Load translations and assert page title
    loginPage.loadTranslations().then(() => {
      loginPage.assertPageTitle();
    });

    // Load test data from fixture file
    cy.fixture('test').then((users) => {
      // Verify the fixture data is an array
      expect(users).to.be.an('array');
      
      // Iterate through each user in the test data
      users.forEach((user) => {
        // Attempt login with different username types:
        loginPage.submitLogin(user.username, user.password);              // Standard user
        loginPage.submitLogin(user.problemUsername, user.password);       // Problem user
        loginPage.submitLogin(user.performanceUsername, user.password);   // Performance user
        loginPage.submitLogin(user.errorUsername, user.password);         // Error user
        loginPage.submitLogin(user.visualUsername, user.password);        // Visual user
        
        // Verify successful login
        if (user.expected === 'success') {
          cy.url().should('include', '/inventory.html');
        } 
        // Note: Error handling would go in the else block
        else {
          // TODO: Add error message validation here
        }

        // For non-locked users, return to login page for next iteration
        if (user.username !== 'locked_out_user') {
          cy.visit('/');
        }
      });
    });
  });
});