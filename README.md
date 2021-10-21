# Getting Started with MERN_CRUD_APPLICATION

## Steps to keep in mind while setting up project

- Make the database name and credentails changes in db.config file in config folder.
- Remove dialectOptions option if working on windows or ubuntu os and according comment this change in index file in models folder.
- After hoisting backend on cloud service, change the api base url in frontend env file for api calls.

## Steps to setup project

- create **scaletech_db** before starting the backend server.All the tables will get build automatically.
- npm builld or yarn build command to create build of frontend folder.
- npm install or yarn install to install all the node_modules.
- Follow below links for more details

- Validation for password while registering the user is :-
  - It must contain special character, character, digit and length must be greater than 8 and less than 15. Eg:- Abcd@1234

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
