This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup
There are 2 files you have to edit first before running the Joybox.
```
/src/service/firebase.js.example
/.firebaserc.example
```
By doing so you need to:

1. Create your Firebase application in [Firebase console.](https://console.firebase.google.com)
2. Replace example config in those files by the config of your Firebase application.
3. Remove `.example` from the file name.

## Project Structure
    .
    ...
    ├── src
    │   ├── component         # low level component
    │   ├── lib               # reuseable function (mostly pure function)
    │   ├── page
    │      ├── Director.js    # entry point of director view
    │      ├── Player.js      # entry point of player view
    │   ├── scene             # scene of game for player
    │   ├── stories           # storybook
    └── README.md
    ...

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn storybook`

For components development
