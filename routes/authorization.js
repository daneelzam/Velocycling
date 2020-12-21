// import express from 'express';
// import bcrypt from 'bcrypt';
// import { sessionChecker } from '../middleware/auth.js';
// import User from '../models/users.js';

const express = require('express');
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/users');

const saltRounds = 10;

const router = express.Router();

router.get('/', sessionChecker, (req, res) => {
  res.redirect('/authorization/login');
});

// роут на маршрут регистрации /authorization/signup
router
  .route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = new User({
        username,
        email,
        password: await bcrypt.hash(password, saltRounds),
      });
      await user.save();
      req.session.user = user;
      res.redirect('/authorization/dashboard');
    } catch (error) {
      res.render('error', error);
    }
  });

// роут на маршрут авторизации /authorization/login
router
  .route('/login')

  .get(sessionChecker, (req, res) => {
    res.render('login');
  })

  .post(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      req.session.user = user;
      res.json({isError: false});
    } else if (!user) {
      res.json({isError: true, typeError: 'username', message: 'Login not found'});
    } else {
      res.json({isError: true, typeError: 'password', message: 'Wrong password'});
    }
  });

// роут на маршрут личного кабинета /authorization/dashboard
router.get('/dashboard', (req, res) => {
  if (req.session.user) {
    const { user } = req.session;
    res.render('dashboard', {
      name: user.username,
    });
  } else {
    res.redirect('/authorization/login');
  }
});

// роут на деавторизацию
router.get('/logout', async (req, res) => {
  if (req.session.user) {
    try {
      await req.session.destroy();
      res.clearCookie('user_sid');
      res.redirect('back');
    } catch (error) {
      res.render('error', error);
    }
  } else {
    res.redirect('/authorization/login');
  }
});

module.exports = router;
