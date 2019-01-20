# Local Library

This is a full stack web app using: React in the frontend and Express/Mongoose/MongoDB in the backend.

This project is based on the tutorial found here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

But it was not done as it is. Here are the main differences: This project uses a local `mongodb` installation. The frontend and backend can be considered two sperate projects in a same repo. The frontend gets data/communicate with the backend using REST API.

## How to run this locally

You have to enter each folder and install dependencies separately.

First make sure you have `nodejs` & `mongodb` installed locally! Then you need `nodemon` installed globally.

### Frontend

The frontend was bootstrapped using `create-react-app`. To run the development server:

```bash
yarn
yarn start
```

### Backend

The backend was bootstrapped using `express-generator`.

You have to populate the local mongodb server (which you need to do once) and start the development server run these command on your console:

```bash
yarn
node populatedb.js mongodb://localhost/local-library
yarn dev
```
