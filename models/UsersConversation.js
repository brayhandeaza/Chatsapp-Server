const Sequelize = require("sequelize")
const { db } = require('../db');


const Friends = db.define('users_conversation', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = Friends


