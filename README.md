[![Build Status](https://travis-ci.org/andela/thor-ah-frontend.svg?branch=develop)](https://travis-ci.org/andela/thor-ah-frontend)
[![Test Coverage](https://api.codeclimate.com/v1/badges/4a442c739c5d70ee29f2/test_coverage)](https://codeclimate.com/github/andela/thor-ah-frontend/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/4a442c739c5d70ee29f2/maintainability)](https://codeclimate.com/github/andela/thor-ah-frontend/maintainability)

This is the client app for the Authors' Haven project.
Built with React

## Table of Contents

- Folder Structure
- Available scripts

## Folder Structure

```
thor-ah-frontend/
  README.md
  License.md
  node_modules/
  package.json
  public/
    index.html
    favicon.ico
  src/
    actions
    assets/
      img/
        logo.svg
    containers
    styles/
      index.css
      App.css
    reducers
    tests/
      App.test.js
    App.js
    index.js
```

For the project to build, **these files must exist with exact filenames**:

- `public/index.html` is the page template;
- `src/index.js` is the JavaScript entry point.

You can delete or rename the other files.

You may create subdirectories inside `src`. For faster rebuilds, only files inside `src` are processed by Webpack.<br>
You need to **put any JS and CSS files inside `src`**, otherwise Webpack won’t see them.

Only files inside `public` can be used from `public/index.html`.<br>
Read instructions below for using assets from JavaScript and HTML.

You can, however, create more top-level directories.<br>
They will not be included in the production build so you can use them for things like documentation.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>

### `npm run build`

Builds the app for production to the build folder.
It correctly bundles the app in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### `npm run lint`

Checks the app for errors and fixes them if possible

### `npm run format`

Formats the app using the prettier plugin
