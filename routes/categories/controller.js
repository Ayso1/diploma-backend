var db = require('../../database');

async function editCategory(req, res, next) {
    try {
        console.log(req.params)
        const original = await db.Categorie.findByPk(req.params.id);

        await db.Categorie.update({
            ...original.dataValues,
            ...req.body,
        }, {where: {id: req.params.id}});
        
        const updatedObject = await db.Categorie.findByPk(req.params.id);
        res.json(updatedObject)
    } catch (err) {
        res.status(500).send(JSON.stringify(err));
    }
}
async function getAllCategorie(reg, res){
    db.Categorie.findAll()
        .then(categories => {
            res.status(200).send(JSON.stringify(categories));
        })
        .catch(err => {
            res.status(500).send(JSON.stringify(err));
        })
}
async function getByID(req, res){
    db.Categorie.findByPk(req.params.id)
        .then( categories => {
            res.status(200).send(JSON.stringify(categories));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
}
async function postOne(reg,res){
    db.Categorie.create({
        name: 'Test',
        id: 1
        })
        .then( categories => {
            res.status(200).send(JSON.stringify(categories));
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });  
}
async function deleteByID(req, res) {
    db.Categorie.destroy({
        where: {
            id: req.params.id
        }
        })
        .then( () => {
            res.status(200).send();
        })
        .catch( err => {
            res.status(500).send(JSON.stringify(err));
        });
}

module.exports = {
    editCategory,
    getAllCategorie,
    getByID,
    postOne,
    deleteByID
}