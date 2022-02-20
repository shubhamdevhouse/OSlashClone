const express = require('express');
const helmet = require('helmet');
const httpStatus = require('http-status');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes/v1');

const { jwtStrategy } = require('./config/passport');
const passport = require('passport');
const ApiError = require('./utils/ApiError');
const app =express();

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
app.use('/v1', routes);
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
  });
module.exports = app;