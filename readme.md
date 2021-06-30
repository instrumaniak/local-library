# Local Library

This is a full stack web app using: _React/Bootstrap_ in the frontend and _Node.js/Express/Mongoose/MongoDB_ in the backend.

This project is based on the tutorial found here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

But it was not done as is. Here are the main differences: The frontend and backend can be considered two sperate projects in a same repo. The frontend gets data/communicate with the backend using REST API. And there are additional features than the tutorial.

### Features

These are the planned features:

- Books, books copies, authors, genres: CRUD operations
- User registration & authentication
- User authorization (roles: reader, staff, admin)
- File (image) upload

You can visit the issues section of github to view current progress of the implementation.

## How to run this locally

You have to enter each folder and install dependencies separately.

First make sure you have `nodejs` & `mongodb` installed! Then you need `yarn` & `nodemon` installed globally.

### Frontend

The frontend was bootstrapped using `create-react-app`. To run the development server, enter the `client` folder and run the following commands on terminal:

```bash
yarn
yarn start
```

Frontend dev server runs on: `http://localhost:3000`

### Backend

The backend was bootstrapped using `express-generator`. Enter the `api` folder. create a `.env` file based on the `.env.sample` file and fill up database credentials.

You have to populate the mongodb database by running `yarn seed` (which you need to do once) and to start the development server run these command on your console:

```bash
yarn
yarn seed
yarn dev
```

Backend dev server runs on: `http://localhost:5000`
