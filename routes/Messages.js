const router = require("express").Router()
const { Users, Messages, UsersConversation, Conversations } = require("../models/")
const { Op } = require('sequelize')

router.get("/", async (req, res) => {
    await Messages.findAll().then(message => {
        res.json({
            message
        })
    })
})


router.get("/conversation/:id", async (req, res) => {
    await Conversations.findAll({
        where: {
            id: req.params.id
        }, 
        include: [
            {
                model: Users,
                where: {
                    id: { [Op.ne]: 1 }
                }
            },
            {
                model: Messages
            }
        ]
    }).then(message => {
        res.json({
            status: 200,
            message
        })
    }).catch(err => {
        res.send(err)
    })
})

router.post("/:id", async (req, res) => {
    const { message, type, conversationId } = req.body
    await Messages.create({
        message,
        type,
        userId: req.params.id,
        conversationId
    }).then(message => {
        res.json({
            status: 200,
            message
        })
    }).catch(err => {
        res.send(err)
    })
})

module.exports = router