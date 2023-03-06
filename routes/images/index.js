var express = require('express')
var router = express.Router()
var db = require('../../database')
var { getPhoto } = require('./controller')

router.get('/:key', getPhoto)

module.exports = router
