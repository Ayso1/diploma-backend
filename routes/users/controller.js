const { query } = require('express')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
var db = require('../../database')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
async function getAllUser(req, res) {
  console.log(req.query.filterByEmail)
  const { filterByEmail } = req.query
  if (filterByEmail) {
    const myEmail = filterByEmail
    await db.User.findOne({
      where: {
        email: myEmail
      }
    })
      .then(user => {
        res.status(200).send(JSON.stringify(user))
      })
      .catch(err => {
        res.status(500).send(JSON.stringify(err))
      })
    const dbQuery1 = await db.User.findOne({
      where: {
        email: myEmail
      }
    })
    const token = jwt.sign(
      { id: dbQuery1.id, myEmail },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '2h'
      }
    )
    await db.User.update(
      {
        ...dbQuery1.dataValues,
        token: token
      },
      {
        where: {
          email: myEmail
        }
      }
    )
    res.status(200).json(dbQuery1)
  } else {
    db.User.findAll()
      .then(user => {
        res.status(200).send(JSON.stringify(user))
      })
      .catch(err => {
        res.status(500).send(JSON.stringify(err))
      })
  }
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
  try {
    const { first_name, last_name, email, password } = req.body
    encryptedPassword = await bcrypt.hash(password, 10)

    const user = await db.User.create({
      ...req.body,
      password: encryptedPassword
    })
    const dbQuery = await db.User.findOne({
      where: {
        email: email
      }
    })
    const token = jwt.sign(
      { id: dbQuery.id, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '2h'
      }
    )
    await db.User.update(
      {
        ...dbQuery.dataValues,
        token: token
      },
      {
        where: {
          email: email
        }
      }
    )

    console.log(token)
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
  }
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

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers['x-access-token']

  if (!token) {
    return res.status(403).send('A token is required for authentication')
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = decoded
  } catch (err) {
    return res.status(401).send('Invalid Token')
  }
  return next()
}

async function sendEmail(req, res) {
  const { title, email } = req.body
  console.log(title)
  const mailOptions = {
    from: 'reznichenko.max9@gmail.com',
    to: email,
    subject: 'VRAPP',
    text: 'Someone is interested in your post ' + title
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'reznichenko.max9@gmail.com',
      pass: process.env.pass
    }
  })
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    } else {
      console.log('Success:' + info.response)
    }
  })
}

module.exports = {
  editUser,
  getAllUser,
  getByID,
  postOne,
  deleteByID,
  verifyToken,
  sendEmail
}
