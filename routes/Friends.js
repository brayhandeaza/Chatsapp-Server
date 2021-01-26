const router = require("express").Router()
const Friends = require("../models/Friends")
const Joi = require('joi')
const { Op } = require('sequelize')

const FriendsSchema = Joi.object({
    friendId: Joi.number().integer().required(),
    status: Joi.string().optional(),
})

// Gey all friends
router.get("/", async (req, res) => {
    await Friends.findAll().then((friends) => {
        res.json({
            status: 200,
            friends
        })
    }).catch((err) => {
        res.send(err)
    })
})

// Get a friend by id
router.get("/:id", async (req, res) => {
    await Friends.findOne({ where: { id: req.params.id } }).then((friend) => {
        res.json({
            status: 200,
            friend
        })
    }).catch((err) => {
        res.send(err)
    })
})

// Get friend friends
router.get("/friend/:id", async (req, res) => {
    await Friends.findAll({
        where: {
            friends: {
                [Op.contains]: [parseInt(req.params.id)]
            }
        }
    }).then((conversation) => {
        res.json({
            status: 200,
            conversation
        })
    }).catch((err) => {
        res.json({
            error: true,
            err
        })
    })
})

// Create a Friendship
router.post("/:id", async (req, res) => {
    await Friends.findOne({ where: { friends: { [Op.contains]: [parseInt(req.params.id)] } } }).then(async (friend) => {
        if (friend) {
            return res.json({
                status: 400,
                message: "this friend already exist"
            })
        } else {
            const { friendId, status } = req.body
            await FriendsSchema.validateAsync({ friendId, status }).then(async () => {
                await Friends.create({
                    friendId: req.params.id,
                    friends: [friendId, req.params.id],
                    status: status || "requested"

                }).then((friend) => {
                    res.json({
                        status: 200,
                        friend
                    })

                }).catch((err) => {
                    res.json({
                        error: true,
                        err
                    })
                })

            }).catch((err) => {
                res.json({
                    error: true,
                    err
                })
            })
        }
    })
})

// Delete friendship
router.delete("/:id", async (req, res) => {
    await Friends.findOne({ where: { id: req.params.id } }).then((friend) => {
        if (friend) {
            friend.destroy().then(() => {
                return res.json({
                    status: 200,
                    friends: "friend deleted succefully"
                })
            }).catch((err) => {
                res.send(err)
            })
        } else {
            returnres.json({
                status: 400,
                friends: "this friend does not exist"
            })
        }
    }).catch((err) => {
        res.send(err)
    })
})

module.exports = router
