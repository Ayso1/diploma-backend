var db = require('../../database')
async function editUser(req, res, next) {
  try {
    console.log(req.params)
    const original = await db.User.findByPk(req.params.id)

    await db.User.update(
      {
        ...original.dataValues,
        ...req.body
      },
      { where: { id: req.params.id } }
    )

    const updatedObject = await db.User.findByPk(req.params.id)
    res.json(updatedObject)
  } catch (err) {
    res.status(500).send(JSON.stringify(err))
  }
}
async function getAllUser(reg, res) {
  db.User.findAll()
    .then(user => {
      res.status(200).send(JSON.stringify(user))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function getByID(req, res) {
  db.User.findByPk(req.params.id)
    .then(user => {
      res.status(200).send(JSON.stringify(user))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function postOne(req, res) {
  db.User.create({
    ...req.body
  })
    .then(user => {
      res.status(200).send(JSON.stringify(user))
    })
    .catch(err => {
      res.status(500).send(JSON.stringify(err))
    })
}
async function deleteByID(req, res) {
  db.User.destroy({
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
  editUser,
  getAllUser,
  getByID,
  postOne,
  deleteByID
}
