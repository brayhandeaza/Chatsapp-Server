const Sequelize = require("sequelize")
const { db } = require('../db');
const Conversations = require("./Conversations")

const Users = db.define('users', {
    fullName: {
        type: Sequelize.STRING,
        allowNullL: false
    },
    email: {
        type: Sequelize.STRING,
        allowNullL: false
    },
    password: {
        type: Sequelize.STRING,
        allowNullL: false
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNullL: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNullL: false
    },
    token: {
        type: Sequelize.TEXT,
        allowNull: false
    }
})


module.exports = Users