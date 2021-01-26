const Sequelize = require("sequelize")
const { db } = require('../db');


const Friends = db.define('friends', {
    friends: {
        type: Sequelize.ARRAY(Sequelize.DataTypes.INTEGER),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Friends


