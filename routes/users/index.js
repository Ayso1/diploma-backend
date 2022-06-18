var express = require('express');
var router = express.Router();
var db = require('../../database');
var { editUser, getAllUser, getByID, postOne, deleteByID } = require('./controller');

/* GET users listing. */
router.get('/', getAllUser);
//put one
router.put('/:id', editUser);
//get by id
router.get("/:id", getByID);
//post test query
router.post("/", postOne);
//delete by id
router.delete("/:id", deleteByID);

module.exports = router;
