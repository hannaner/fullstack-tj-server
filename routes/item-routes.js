const express = require('express')
const itemSchema = require('../models/item')
const mongoose = require('mongoose')
const Item = mongoose.model('Item', itemSchema)

const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')
const Basket = require('../models/basket')

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
// GET /items/:itemId
router.get('/items/:itemId', (req, res, next) => {
    Item.findById(req.params.id)
        .then(handle404)
        .then(item => {
            res.status(200).json({ item: item })
        })
})


// CREATE
// POST /items
router.post('/items', requireToken, (req, res, next) => {
    const basketId = req.body.item.basketId

    // console.log(req.body)
    /* output in console
    { item: 
        { itemName: 'express', description: 'espresso', quantity: 1 } 
    }
    */
    const item = req.body.item


    // Item.create(req.body.item)
    //     .then((item) => {
    //         res.status(201).json({ item: item })
    //     })
    //     .catch(next)

    Basket.findById(basketId)
        .then(handle404)
        then(basket => {
            basket.items.push(item)
            return basket.save()
        })
        .then(basket => {
            res.status(201).json({ basket: basket })
        })
        .catch(next)
})

// UPDATE
// PATCH /items/:itemId
router.patch('/items/:itemId', (req, res, next) => {
    const basketId = req.body.item.basketId

    const itemBody = req.body.item

    // Item.findById(req.params.id)
    //     .then(handle404)
    //     .then(item => {
    //         return item.updateOne(req.body.item)
    //     })
    //     .then(() => res.sendStatus(204))
    //     .catch(next)
    Basket.findById(basketId)
    .then(handle404)
    .then(basket => {
        // finding note by its id
        const item = basket.items.id(req.params.itemId)
        
        // setting the new note content to be the content passed in
        items.set(itemBody)

        // save the modified doc!!
        return basket.save()
    })
    // gotta send the response
    .then(() => res.sendStatus(204))
    .catch(next)
})


// DELETE
// DELETE /items/:id
// router.delete('/items/:itemId', (req, res, next) => {
//     Item.findById(req.params.id)
//         .then(handle404)
//         .then(item => {
//             return item.deleteOne()
//         })
//         .then(() => res.sendStatus(204))
//         .catch(next)
// })

router.delete('/items/:itemId', (req, res, next) => {
    const basketId = req.body.item.basketId
    
    Basket.findById(basketId)
    .then(handle404)
    .then(basket => {
        // finding the correct note to remove
        // .remove() we delete it
        basket.items.id(req.params.itemId).remove()
        
        // save since these are modified
        basket.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)

})

module.exports = router