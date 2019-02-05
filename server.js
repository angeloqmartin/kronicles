"use strict";

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {DATABASE_URL, PORT} = require('./config');
const { TripReport } = require('./model');

const app = express();

app.use(express.json());
app.use(express.static('public'));

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, 
// `server` is declare here and then assign a value to it in run
let server;

// connects to our database, then starts server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

// closes server, and returns a promise 
// to use in integration tests
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

// if server.js is called directly this block runs
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { runServer, app, closeServer };