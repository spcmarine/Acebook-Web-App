# Acebook

This is a Node.js template for the Acebook engineering project.

## Quickstart

### Install Node.js

1. Install Node Version Manager (NVM)
    ```
    brew install nvm
    ```
    Then follow the instructions to update your `~/.bash_profile`.
1. Open a new terminal
1. Install the latest long term support (LTS) version of Node.js, currently `10.16.3`.
    ```
    nvm install 10.16.3
    ```

### Set up your project

1. Fork this repository
1. Clone your fork to your local machine
1. Install Node.js dependencies
    ```
    npm install
    ```
1. Install an ESLint plugin for your editor. For example: [linter-eslint](https://github.com/AtomLinter/linter-eslint) for Atom.
1. Install MongoDB
    ```
    brew cask install mongodb
    ```
    Then open the MongoDB application. A leaf icon should appear in the Menu Bar.

### Start

1. Start the server
    ```
    npm start
    ```
1. Browse to [http://localhost:3000](http://localhost:3000)

### Test

* Run all tests
    ```
    npm test
    ```
* Run linter only
    ```
    npm run lint
    ```
* Run unit tests only
    ```
    npm run test:unit
    ```
* Run integration tests only
    ```
    npm run test:integration
    ```

#### Start test server

The server must be running locally with test configuration for the
integration tests to pass.
```
npm run start:test
```
This starts the server on port `3030` and uses the `acebook_test` MongoDB database,
so that integration tests do not interact with the development server.
