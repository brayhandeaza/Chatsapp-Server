const Sequelize = require("sequelize")
const { db } = require('../db');

const Messages = db.define('messages', {
    message: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
})


module.exports = Messages