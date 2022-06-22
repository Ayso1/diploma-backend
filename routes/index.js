var express = require('express')
var router = express.Router()
var userRouter = require('./users')
var categorieRouter = require('./categories')
var charityRouter = require('./charity')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/user', userRouter)
router.use('/categorie', categorieRouter)

module.exports = router
