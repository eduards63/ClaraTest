Clara Automation Test with Saucedemo Page

Table of Contents:

Prerequisites
Setup
Project Structure
Key Commands
Features
Test Execution
CI/CD Integration
Code Coverage
Troubleshooting

----------------------------------------------------
Prerequisites:

Node.js v16 or higher
npm v8 or higher
Git
Chrome/Firefox browser

----------------------------------------------------
Setup:

1. Clone the repository
git clone https://github.com/eduards63/ClaraTest.git
cd technical_test
2. Install dependencies
npm install

-----------------------------------------------------
Key Commands:

Command	Description
npm run cy:open	Open Cypress in interactive mode
npm run cy:run	Run all tests in headless mode
npm run cy:parallel	Run tests in parallel (requires record key)
npm run cy:chrome	Run tests in Chrome browser
npm run coverage	Generate code coverage report

------------------------------------------------------
Features:

-Page Object Model implementation
-Multi-environment support (dev/staging/prod)
-API + UI testing integration
-Data-driven testing with JSON fixtures
-Multi-language support
-Parallel test execution
-Automatic screenshots on failures
-HTML + Dashboard reporting
-Code coverage analysis

------------------------------------------------------
Test Execution:

-Run all tests
npm run cy:run
-Run specific test suite
npx cypress run --spec "cypress/e2e/login/*.cy.js"
-Run in parallel with recording
npm run cy:parallel
-Generate coverage report
npm run coverage
# Open coverage report
open coverage/index.html

-------------------------------------------------------
CI/CD Integration:

The project includes GitHub Actions workflow that:
-Runs tests on push to main branch
-Supports parallel test execution
-Generates HTML reports
-Checks code coverage

-------------------------------------------------------
Code Coverage:

Code coverage is configured using:
-@cypress/code-coverage plugin
-NYC (Istanbul) for coverage reports

-View coverage
Run tests with coverage:
npm run cy:run --env coverage=true

-Generate HTML report:
npm run coverage
Open coverage/index.html

------------------------------------------------------
Dependencies:

cypress	/^12.0+/	Test framework
@cypress/code-coverage	/^3.10+/	Code coverage
mochawesome	/^7.1+/	HTML reporting
cypress-multi-reporters	/^1.6+/	Combined reports
nyc	/^15.1+/	Coverage analysis

-----------------------------------------------------
Contact
For support, please contact eduards6326@gmail.com