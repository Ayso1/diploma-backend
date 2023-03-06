var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var categoriesRouter = require('./routes/categories')
var charityRouter = require('./routes/charity')
var imageRouter = require('./routes/images')
var uploadRouter = require('./routes/upload')

var corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

var app = express()
app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/categories', categoriesRouter)
app.use('/charity', charityRouter)
app.use('/images', imageRouter)
app.use('/upload', uploadRouter)

module.exports = app
