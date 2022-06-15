var express = require('express');
var router = express.Router();
var userRouter = require('./users');
var CategorieRouter = require('./categories');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/user',userRouter);
router.use('/categorie', CategorieRouter);

module.exports = router;
