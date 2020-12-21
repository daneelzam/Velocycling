// import express from 'express';
//
// import config from './middleware/index.js';
// import dotenv from "dotenv";
// dotenv.config();

const express = require('express');
const dotenv = require('dotenv');
const config = require('./middleware');

dotenv.config();

const indexRouter = require('./routes/index.js');
const authRouter = require('./routes/authorization.js');
const cycleRouter = require('./routes/cyclingRoute.js');

const app = express();

config(app);

app.use('/', indexRouter);
app.use('/authorization', authRouter);
app.use('/cycling-routes', cycleRouter);

// export default app;

module.exports = app;
