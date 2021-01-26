const router = require("express").Router()
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Users, Messages, UsersConversation, Conversations } = require("../models/")
const { Op } = require('sequelize')

router.get("/", async (req, res) => {
    await Users.findAll({
        include: {
            model: UsersConversation,
            include: {
                model: Conversations,
                include: {
                    model: Messages,
                    order: [['id', 'ASC']],
                    include: {
                        model: Users
                    }
                }
            }
        }
    }).then((users) => {
        res.json({
            status: 200,
            users
        })
    })
})

router.get("/:id", async (req, res) => {
    await Users.findAll({
        where: { id: req.params.id },
        include: {
            model: UsersConversation,
            include: {
                model: Conversations,
                include: {
                    model: Messages,
                    order: [['id', 'ASC']],
                    include: {
                        model: Users
                    }
                }
            }
        }
    }).then((users) => {
        res.json({
            status: 200,
            users
        })
    }).catch((err) => {
        re.send(err)
    })
})

router.post("/", async (req, res) => {
    const { fullName, email, password, phoneNumber, token, imageUrl, toToken, secreKey } = req.body
    await Users.create({
        fullName,
        email,
        password,
        phoneNumber,
        token,
        imageUrl,
        toToken,
        secreKey
    }).then((users) => {
        res.json({
            users
        })
    })
})

module.exports = router

