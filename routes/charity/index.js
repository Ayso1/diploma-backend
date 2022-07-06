var express = require('express')
var router = express.Router()
var db = require('../../database')
var {
  editCharity,
  getAllCharity,
  getByID,
  postOne,
  deleteByID,
  getByCategorie
} = require('./controller')

/* GET users listing. */
router.get('/', getAllCharity)
//put one
router.put('/:id', editCharity)
//get by id
router.get('/:id', getByID)
//get by categorie id
router.get('/categorie/:id', getByCategorie)
//post test query
router.post('/', postOne)
//delete by id
router.delete('/:id', deleteByID)

module.exports = router
