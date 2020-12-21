import mongoose from 'mongoose';
import Road from './biceRoad.js';
const mongoose = require('mongoose')
const Road  = require('./biceRoad')

const cloudDb = 'mongodb+srv://timur:timur@cluster0.qs62h.mongodb.net/velocycling';

const dbConnect = () => {
  mongoose.connect(cloudDb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
};

dbConnect();
async function seedr() {
  const road0 = await new Road({
    routeMap: [[59.93880040649691, 30.295440510156375],
      [59.93268426593978, 30.260421589257586],
      [59.938880870697936, 30.2448187003949],
      [59.94900014132335, 30.216666234574586],
      [59.95537153847755, 30.23554898603941],
      [59.95020563503547, 30.27322865828064]],
    routeName: 'In the center of St. Petersburg',
    routeLength: 76,
    location: 'St. Petersburg',
    routeAuthor: '5fbf8629420358678c3b7661',
    routeText: 'Great route for those who have recently moved to St. Petersburg and want to see the main attractions',
  });
  const road1 = await new Road({
    routeMap: [[59.9431833, 30.3549496],
      [59.9431833, 30.3549494],
      [59.9421623, 30.3559152],
      [59.940273, 30.3535462],
      [59.9403091, 30.3523373],
      [59.9403091, 30.3523373]],
    routeName: 'A leisurely bike ride in the vicinity of Vyborg',
    routeLength: 130,
    location: 'Vyborg',
    routeAuthor: '5fbf9426b2e8a6583ccdbef0',
    routeText: 'A route for those who are tired of the bustle of the city and want to enjoy the views of nature',
  });
  await road0.save();
  await road1.save();
  mongoose.connection.close();
}

seedr();
