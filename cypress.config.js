const { defineConfig } = require("cypress");
const fs = require("fs");



module.exports = defineConfig({
  projectId: "g3repg",
// Test report configuration using Mochawesome
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results', // Directory where reports will be stored.
    overwrite: false, // Prevents overwriting previous reports.
    html: true, // Create a html format report.
    json: true, // Create a Json format Report.
  },
  e2e: {
    screenshotOnRunFailure: true,
    video: true,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // This is the necessary code was added to consider the environment file dev_env, allowing the configuration to execute from "dev, staging or product"
      // (I decided to use the URL as if it were production because the tests are conducted directly on the page that would be production, not dev or staging.)
      // if no other environment is specified.
      const envFile = `./cypress/config/${config.env.configFile || 'prod_env'}.json`;
      const settings = JSON.parse(fs.readFileSync(envFile));
      
      config.baseUrl = settings.baseUrl;
      config.env = {
        ...config.env,
        ...settings.env
      };
      
      return config;
    },
  },
});
