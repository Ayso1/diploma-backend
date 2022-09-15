var express = require('express')
var router = express.Router()
var db = require('../../database')
var { postPhoto, getPhoto } = require('./controller')

router.get('/', postPhoto)
router.get('/:key', getPhoto)

module.exports = router
