const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { createUserToken } = require('../config/auth')

const router = express.Router()

// POST /sign-up
router.post('/sign-up', (req, res, next) => {
    bcrypt
    // takes 2 parameters: 1) what it's hashing, 2) how many times you're hashing it (usually good to have double digits)
        .hash(req.body.credentials.password, 10)
        .then(hashedPassword => {
            // updating the document with the hashed pw
            return {
                email: req.body.credentials.email,
                password: hashedPassword
            }
        })
        .then(user => User.create(user))
        .then(user => {
            res.status(201).json({ user: user })
        })
        .catch(next)
})

// POST /sign-in
router.post('/sign-in', (req, res, next) => {
    User.findOne({ email: req.body.credentials.email })
        .then(user => createUserToken(req, user))
        .then(token => res.json({ token: token }))
        .catch(next)
})

// INDEX
// GET /users
router.post('/users', (req, res, next) => {
    User.find()
    .then(users => {
        return users.map(user => user)
    })
    .then(users => {
        res.status(200).json({ user: user })
    })
    .catch(next)
})

module.exports = router