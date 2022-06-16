var express = require('express');
var router = express.Router();
var db = require('../../database');
var { editCategory, getAllCategorie, getByID, postOne, deleteByID } = require('./controller');

/* GET users listing. */
router.get('/', getAllCategorie);
//put one
router.put('/:id', editCategory);
//get by id
router.get("/:id", getByID);
//post test query
router.post("/", function(reg,res){
    db.Categorie.create({
        name: 'Test',
        id: 1
        })
        .then( categories => {
            res.status(200).send(JSON.stringify(categories));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        })
});
//delete by id
router.delete("/:id", deleteByID);


module.exports = router;