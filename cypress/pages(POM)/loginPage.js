// Page Object Model for the Login Page
class LoginPage {

  constructor(language = 'en') {
    // Validate that the selected language is supported
    if (!['en', 'esp'].includes(language)) {
      throw new Error(`Unsupported language: ${language}`);
    }
    // Store the selected language
    this.language = language;
  }

  loadTranslations() {
    return cy
      // Load the translation file for the selected language from the fixtures folder
      .fixture(`${this.language}.json`, { timeout: 5000 })
      // Create an alias '@translations' to easily access translations later in tests
      .as('translations')
      .then((translations) => {
        // Ensure the loaded translation file includes the 'login' section
        if (!translations.login) {
          throw new Error('Translation file missing login keys');
        }
        // Save the translations in the class instance for potential direct use
        this.translations = translations;
      })
      // Log the successful loading of translations with the selected language
      .log(`Loaded translations for language: ${this.language}`);
  }

  assertPageTitle() {
    // Retrieve the translations using the alias created earlier
    cy.get('@translations').then((translations) => {
      // Assert that the page title matches the expected translation
      cy.title().should('eq', translations.login.title);
    });
  }
    


    // Define page elements as functions for dynamic access
    elements = {
        page: () => cy.visit('/'), // Navigates to the root URL
        usernameId: () => cy.get('#user-name'), // Username input field
        passwordId: () => cy.get('#password'), // Password input field
        loginButtonId: () => cy.get('#login-button'), // Login button
        errorMessageAtt: () => cy.get('[data-test="error"]'), // Error message element
    };

    // Method to visit the login page
    visit(){
        cy.visit('/');
    }

    // Method to type the username into the username field
    typeUsername(username) {
        this.elements.usernameId().type(username);
    }

    // Method to type the password into the password field
    typePassword(password) {
        this.elements.passwordId().type(password);
    }

    // Method to click the login button
    loginButton() {
        this.elements.loginButtonId().click();
    }

    // Method to perform the complete login process
    submitLogin(username, password) {
        this.visit(); // Navigate to the login page
        this.typeUsername(username); // Enter username
        this.typePassword(password); // Enter password
        this.loginButton(); // Click login
    }

    // Method to assert that the error message contains the expected text
    errorMessage(message) {
        this.elements.errorMessageAtt().should('contain.text', message);
    }
    

}


export default LoginPage;