"use strict";

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const passport = require('passport');
mongoose.Promise = global.Promise;

const {
  DATABASE_URL,
  PORT
} = require('./config');

const {
  TripReport
} = require('./trips/model')

const app = express();
app.use(morgan('common'));

const tripReportRouter = require("./trips/router")
app.use(express.static('public'));
app.use(express.json());

//import router and route requests to HTTP requests
app.use("/trip-report", tripReportRouter);

//closeServer needs access to a server object but
//only get created when 'runServer' runs, so server is declar here
//and then assign a value to it in run
let server;

// this function connects to our database, then starts server
function runServer(databaseUrl = DATABASE_URL, port = PORT) {
  return new Promise((resolve, reject) => {
    console.log(DATABASE_URL);
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

// this function closes the server, and returns a promise
// will be used in CI test
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

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {
  runServer,
  app,
  closeServer
};