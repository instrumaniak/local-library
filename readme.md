# Server-side website programming using Express/Mongoose

This project is based on the tutorial found here: https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs

But I was not done as it is, I took the liberty to choose some stuffs: This project uses a local `mongodb` installation. Also it uses `EJS` for templating & `SCSS` for styles. 

## How to run this locally

First make sure you have `nodejs` & `mongodb` installed locally! Then you need `nodemon` installed globally.

Then first install dependencies, populate the local mongodb server (which you need to do once) and start the development server run these command on your console:

```bash
yarn
node populatedb.js mongodb://localhost/local-library
yarn dev
```