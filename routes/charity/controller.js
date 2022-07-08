var db = require('../../database')

async function editCharity(req, res, next) {
  try {
    console.log(req.params)
    const original = await db.Charity.findByPk(req.params.id)

    await db.Charity.update(
      {
        ...original.dataValues,
        ...req.body
      },
      { where: { id: req.params.id } }
    )

    const updatedObject = await db.Charity.findByPk(req.params.id)
    res.json(updatedObject)
  } catch (err) {
    res.status(500).send(JSON.stringify(err))
  }
}
async function getAllCharity(reg, res) {
  db.Charity.findAll({
    attributes: { exclude: ['userId', 'categorieId'] },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt']
      },
      {
        model: db.Categorie,
        as: 'categorie',
        attributes: ['id', 'name', 'createdAt', 'updatedAt']
      }
    ]
  })
    .then(charity => {
      res.status(200).send(JSON.stringify(charity))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function getByID(req, res) {
  db.Charity.findByPk(req.params.id, {
    attributes: { exclude: ['userId', 'categorieId'] },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt']
      },
      {
        model: db.Categorie,
        as: 'categorie',
        attributes: ['id', 'name', 'createdAt', 'updatedAt']
      }
    ]
  })
    .then(charity => {
      res.status(200).send(JSON.stringify(charity))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function getByCategorie(req, res) {
  db.Charity.findOne({
    where: { categorieId: req.params.id },
    attributes: { exclude: ['userId', 'categorieId'] },
    include: [
      {
        model: db.User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'createdAt', 'updatedAt']
      },
      {
        model: db.Categorie,
        as: 'categorie',
        attributes: ['id', 'name', 'createdAt', 'updatedAt']
      }
    ]
  })
    .then(charity => {
      res.status(200).send(JSON.stringify(charity))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function postOne(reg, res) {
  db.Charity.create({
    title: 'Test',
    photos: '{{baseurl}}/categorie/1',
    descriptions: 'Description of test charity.',
    userId: 1,
    categorieId: 1,
    id: 1
  })
    .then(charity => {
      res.status(200).send(JSON.stringify(charity))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function deleteByID(req, res) {
  db.Charity.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.status(200).send()
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}

module.exports = {
  editCharity,
  getAllCharity,
  getByCategorie,
  getByID,
  postOne,
  deleteByID
}
