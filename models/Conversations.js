const Sequelize = require("sequelize")
const { db } = require('../db');

const Conversations = db.define('conversations', {
    userIds: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNullL: false
    }
})

module.exports = Conversations