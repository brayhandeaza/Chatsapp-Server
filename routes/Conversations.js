const router = require("express").Router()
const { Users, Messages, UsersConversation, Conversations } = require("../models/")


router.get("/", async (req, res) => {
    await UsersConversation.findAll().then(async (userConversation) => {
        await Conversations.findAll().then(async (conversation) => {
            await Conversations.fin
            res.json({
                status: 200,
                conversation,
                userConversation
            })
        })
    })
})


// router.get("/")


router.post("/:id", async (req, res) => {
    const { first_id } = req.body
    await Conversations.create({
        userIds: [first_id, req.params.id]
    }).then(async (conversation) => {
        await UsersConversation.create({
            userId: conversation.userIds[0],
            conversationId: conversation.id
        }).then((usersConversation) => {
            res.json({
                usersConversation
            })
        }).catch(err => {
            res.send(err)
        })

        await UsersConversation.create({
            userId: conversation.userIds[1],
            conversationId: conversation.id
        }).then((usersConversation) => {
            res.json({
                usersConversation
            })
        }).catch(err => {
            res.send(err)
        })

    }).catch(err => {
        res.send(err)
    })
})

module.exports = router


