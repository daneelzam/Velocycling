// import express from 'express';
// import hbs from 'hbs';
// import path from 'path';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import sessionFileStore from 'session-file-store';
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const cookieParser= require('cookie-parser')
const session = require('express-session')
const sessionFileStore = require('session-file-store')


const dotenv = require('dotenv')
dotenv.config()

// import { cookiesCleaner } from './auth.js';
// import dbConnect from './dbConnect.js';

const { cookiesCleaner } = require('./auth')
const dbConnect = require('./dbConnect')

// const __dirname = path.resolve();
const FileStore = sessionFileStore(session);

const config = (app) => {
  dbConnect();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(
    session({
      store: new FileStore(), // указываем тип хранилища для сессий, он создаст папку
      name: 'user_sid', // это имя для всех создаваемых куки
      secret: 'banan', // это секретное слово на основе которого происходит шифрование пароля
      resave: true, // перезапись времени жизни cookie при каждом подключении юзера
      saveUninitialized: false, // настройка создания сессии, даже без авторизации
      cookie: {
        expires: 600000, // время жизни cookie в миллисекундах
        httpOnly: true, // true - cookie невозможно выгрузить средствами JS, false - можно
      },
    }),
  );

  app.use((req, res, next) => {
    if (req.session.user) {
      res.locals.user = req.session.user;
    }
    next();
  });
  app.use(cookiesCleaner);
  app.use(express.static(path.join(__dirname, '..', 'public')));

  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'hbs');
  hbs.registerPartials(path.join(__dirname, 'views/partitials'));
};

module.exports = config
