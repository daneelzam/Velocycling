// import mongoose from 'mongoose';
const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const roadSchema = new Schema({
  routeMap: [], // карта с маршрутом
  routeLength: { type: Number },
  location: { type: String, default: 'St. Petersburg' },
  routeName: { type: String },
  routeText: { type: String },
  routeAuthor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, //   id na user
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }], // ref на коллекцию с коменнтами
  countLike: Number,
});

roadSchema.methods.getLike = async function () { // методы у модели, который возращает кол-во лайков
  this.countLike = this.likes.length;
  await this.save();
};
roadSchema.methods.addComment = function (comment) { // функция которая принимает на вход коменнтарий
  this.comments.push(comment); // и добавляет в список коментариев к маршруту,
};

roadSchema.methods.addLike = function (user) { // фунция которая принимает ид юзеров, и пушит в массив если его там нет
  if (!(this.likes.indexOf(user))) {
    this.likes.push(user);
  }
};

roadSchema.methods.addRoad = function (...coordinats) { // принимает маршрут и добавляет
  this.routeMap.push(...coordinats);
};

// mongoose.connect('mongodb://localhost/velocycling', {useNewUrlParser: true, useUnifiedTopology: true  });
// const Road = model('Road', roadSchema);

// export default Road;
module.exports = mongoose.model('Road', roadSchema);
