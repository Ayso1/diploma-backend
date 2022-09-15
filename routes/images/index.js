var express = require('express')
var router = express.Router()
var db = require('../../database')
var { getPhoto } = require('./controller')

router.get('/', getPhoto)

//var formData = new FormData()
//router.post('/image', upload.single('image'), async function (req, res) {
//  const file = req.file
//  await up
//})

module.exports = router
