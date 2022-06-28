// database.js
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
  process.env.DB_SCHEMA || 'postgres',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: process.env.DB_SSL == 'true'
    }
  }
)

const Categorie = sequelize.define('Categorie', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
const User = sequelize.define('User', {
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isEmailVerified: {
    type: Sequelize.BOOLEAN
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  }
})
const Charity = sequelize.define('Charity', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  photos: {
    type: Sequelize.STRING
  },
  descriptions: {
    type: Sequelize.STRING
  },
  UserId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  CategorieId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
})
//relations
//one to many User and Charity
User.hasMany(Charity)
Charity.belongsTo(User)
//one to many Charity and Categorie
Categorie.hasMany(Charity)
Charity.belongsTo(Categorie)

module.exports = {
  sequelize: sequelize,
  Categorie: Categorie,
  User: User,
  Charity: Charity
}
