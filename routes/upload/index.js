var express = require('express')
var router = express.Router()
var fileupload = require('express-fileupload')
var bodyParser = require('body-parser')
var { uploadPhoto, deletePhoto } = require('../images/controller')
var fs = require('fs')

router.use(fileupload())
router.use(express.static('files'))
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.post('/', async (req, res) => {
  //console.log(req.files)

  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }
  const file = req.files.file
  //var bitmap = fs.readFileSync(file)
  //console.log(bitmap)
  // convert binary data to base64 encoded string
  // return new Buffer(bitmap).toString('base64')
  // var base64data = Buffer.from(file.data).toString('base64')
  //var base64data = Buffer.from(file.data).toString('base64')
  const awsres = await uploadPhoto(file.data)
  //console.log(awsres)

  res.status(200).json({ link: awsres.Location, filename: awsres.Key })
  return awsres.Location
})

router.delete('/:filename', async (req, res) => {
  //console.log(req.params)

  if (req.body === null) {
    return res.status(400).json({ msg: 'No filename' })
  }
  const filename = req.params.filename
  const awsres = await deletePhoto(filename)
  awsres

  res.status(200).json({ msg: 'Success' })
})

module.exports = router
