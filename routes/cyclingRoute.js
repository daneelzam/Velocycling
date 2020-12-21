// import express from 'express';
// import Rout from '../models/biceRoad.js';

const  express = require('express')
const Rout = require('../models/biceRoad')
const router = express.Router();

// получаем все маршруты из БД---- перенос ручки на корень сайта
// router.get('/', async (req, res) => {
//   const cyclRoutes = await Rout.find({});
//   res.render('main', { 
//     cyclRoutes
//   });
// });
//
// рендерим конкретный веломаршрут
router.get('/:id', async (req, res) => {
  const _id = req.params.id;
  const cyclRoute = await Rout.findOne({ _id });
  res.render('rout', { cyclRoute });
});

// создание нового маршрута, пока передаем только имя и автора
router.post('/', async (req, res) => {
  // сюда нужно добавить еще координаты маршрута
  const { arr, routeName, distance, routeText, location } = req.body;
  if (distance) {
    const newRoute = await Rout.create({
      routeMap: arr,
      routeLength: distance,
      location,
      routeName,
      routeText,
      routeAuthor: req.session.user._id,
    });
    res.json({key: true});
  }
});

//изменение маршрута(лайки)
router.put('/:id', async (req, res) => {
  const _id = req.params.id;
  const cyclRoute = await Rout.findOne({ _id });
  // вызываем метод документа по лайкам
  const likes = Rout.getLike();
  res.json(likes);
});

module.exports = router
