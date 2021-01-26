const Sequelize = require('sequelize')
const Conversations = require('./Conversations')
const Friends = require('./Friends')
const Messages = require('./Messages')
const Users = require('./Users')
const UsersConversation = require('./UsersConversation')

// Models Assionations
Users.hasMany(Messages)
Messages.belongsTo(Users)
Users.hasMany(UsersConversation)
Conversations.belongsToMany(Users, { through: UsersConversation })
UsersConversation.belongsTo(Conversations)
Conversations.hasMany(Messages)


module.exports = {
    Users,
    Messages,
    UsersConversation,
    Conversations
}
