const express = require('express')
const Item = require('../models/item')

const router = express.Router()

// INDEX
// GET /items
router.get('/items', (req, res, next) => {
    Item.find()
    .then(items => {
        return items.map(item => item)
    })
    .then(items => {
        res.status(200).json({ items: items })
    })
    .catch(next)
})

// SHOW
// GET /items/:id
router.get('/items/:id', (req, res, next) => {
    Item.findById(req.params.id)
        .then(item => {
            res.status(200).json({ item: item })
        })
})


// CREATE
// POST /items
router.post('/items', (req, res, next) => {
    Item.create(req.body.item)
        .then((item) => {
            res.status(201).json({ item: item })
        })
        .catch(next)
})

// UPDATE
// PATCH /items/:id
router.patch('/items/:id', (req, res, next) => {
    Item.findById(req.params.id)
        .then(item => {
            return item.updateOne(req.body.item)
        })
        .then(() => res.sendStatus(204))
        .catch(next)
})



module.exports = router