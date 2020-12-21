const express = require('express')
const Rout = require('../models/biceRoad')
const User = require('../models/users')
const Comment = require('../models/comments')
const { contains } = require('../middleware/auth')

const router = express.Router();

router.get('/', async (req, res) => {
  const cyclRoutes = await Rout.find({}).populate('routeAuthor');
  cyclRoutes.forEach((el) => el.getLike());
  res.render('main', {
    cyclRoutes,
  });
});

// ручка на получение объектов после загрузки странички
router.get('/coordinates', async (rec, res) => {
  const cyclRoutes = await Rout.find();
  res.json(cyclRoutes);
});


router.get('/route/:id', async (req, res) => {
  const { id } = req.params;
  const roadAuthor = await Rout.findById({ _id: id }).populate('comments'); // находим по Ид маршрута, для его дальнейшего рендеренга
  const nameAuthor = await User.findById({ _id: roadAuthor.routeAuthor }); // ищем юзера, создателя поста

  res.render('rout', {
    routeName: roadAuthor.routeName,
    roadAuthor,
    name: nameAuthor.username,
    distance: roadAuthor.routeLength,
    location: roadAuthor.location,
    likes: roadAuthor.likes.length,
    comments: roadAuthor.comments,
    id,

    // commentText: onlyComment.text,
    // commentAuthor: onlyComment
  });
});


router.post('/route/:id', async (req, res) => {
  let a = await Rout.findById(req.params.id)
  let b = a.likes
// console.log(a);
    a.likes.push(req.session.user)
    await a.save()
    res.json({ key: a.likes.length, a })
  
})

router.post('/comment', async (req, res) => {
  const newComment = new Comment({
    text: req.body.comment,
    author: req.session.user._id,     // находим по сесси ид юзера и даем ему автора поста
  })
  await  newComment.save()
  res.redirect('back')
})


router.post('/comment/:id', async (req, res) => {
  const { id } = req.params;
  const rout = await Rout.findById({ _id: id });
  const newComment = new Comment({
    text: req.body.comment,
    author: req.session.user._id, // находим по сесси ид юзера и даем ему автора поста
    authorName: req.session.user.username,
  });
  await newComment.save();
  rout.comments.push(newComment); // добавляем коммент в массив маршрута
  await rout.save();
  // res.redirect('back')
  res.json({
    authorName: newComment.authorName,
    text: newComment.text,
  });
});


router.post('/sort', async (req, res) => {
  const { sortSelect } = req.body;
  const cyclRoutes = await Rout.find({}).populate('routeAuthor');
  cyclRoutes.forEach((el) => el.getLike());
  cyclRoutes.sort((a, b) => b[sortSelect] - a[sortSelect]);
  res.json({
    cyclRoutes,
  });
});

module.exports = router;
