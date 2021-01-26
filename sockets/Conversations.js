const { Conversations, Friends, Messages, Users, UsersConversation } = require('../models/')
const { Op } = require('sequelize')


class Chats {
    constructor(ws) {
        this.ws = ws
    }
    conversation = async (id) => {
        await Users.findAll({
            where: { id },
            include: {
                model: UsersConversation,
                include: [
                    {
                        model: Conversations,
                        include: [
                            {
                                model: Users,
                                where: {
                                    id: { [Op.ne]: id }
                                }
                            },
                            {
                                model: Messages
                            }
                        ]
                    }
                ]
            }
        }).then(async (conversations) => {
            this.ws.send(JSON.stringify({ conversations }))
            return
        }).catch((err) => {
            this.ws.send(JSON.stringify({ err }))
            return err
        })
    }

    messages = async (id) => {
        await Messages.findAll({
            where: { id }
        }).then((messages) => {
            this.ws.send(JSON.stringify({ messages }))
            return
        }).catch((err) => {
            this.ws.send(JSON.stringify({ err }))
            return
        })
    }
}

module.exports = Chats