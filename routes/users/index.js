var express = require('express')
var router = express.Router()
var db = require('../../database')
var {
  editUser,
  getAllUser,
  getByID,
  postOne,
  deleteByID,
  sendEmail,

  verifyToken
} = require('./controller')

/* GET users listing. */
router.get('/', getAllUser)
//put one
router.put('/:id', editUser)
//get by id
router.get('/:id', getByID)
//post test query
router.post('/', postOne)
//delete by id
router.delete('/:id', deleteByID)

router.post('/email', sendEmail)

router.post('/welcome', verifyToken, (reg, res) => {
  res.status(200).send('Welcome 🙌 ')
})

module.exports = router
