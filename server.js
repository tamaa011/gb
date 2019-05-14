
require("@babel/register")({

  "plugins": [

      [
          "@babel/plugin-proposal-decorators",
          {
              "legacy": true
          }
      ],
  ],
})
  // Import the rest of our application.
  module.exports = require('./app.js')