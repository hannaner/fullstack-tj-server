const express = require('express')
const router = express.Router()

const Item = require('../models/item')

const startingItems = [
    {
        itemName: "Trader Joe O's",
        description: "Chocolate cookies with cream sandwich",
        quantity: 1
    },
    {
        itemName: "Winter tea",
        description: "Herbal, non-caffeinated green tea with a minty twist",
        quantity: 2
    },
    {
        itemName: "Herb popcorn",
        description: "Lightly salted popcorn with herb seasoning",
        quantity: 4
    },
    {
        itemName: "Mini ice cream cones",
        description: "Mini ice cream cones with dark chocolate filling at the bottom",
        quantity: 5
    }
]

router.get('/items', (req, res, next) => {
    Item.deleteMany({})
        .then(() => {
            Item.create(startingItems)
                .then(items => {
                    res.status(200).json({ items: items })
                })
        })
        .catch(next)
})

module.exports = router