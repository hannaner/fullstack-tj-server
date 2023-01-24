// require Express
const express = require('express')
const { handle404 } = require('../lib/custom-errors')
const { requireToken } = require('../config/auth')

// require the Model we just created
const Basket = require('../models/basket')

// Creating a router for us to make paths on
const router = express.Router()

// INDEX
// GET /baskets
// adding the requireToken middleware
// having requireToken allows us to make sure that the user has to be signed in
router.get('/baskets', requireToken, (req, res, next) => {
	Basket.find()
		.then((baskets) => {
			return baskets.map((basket) => basket)
		})
		.then((baskets) => res.status(200).json({ baskets: baskets }))
		.catch(next)
})

// SHOW
// GET /baskets/5a7db6c74d55bc51bdf39793
router.get('/baskets/:id', requireToken, (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Basket.findById(req.params.id)
		.then(handle404)
		.then((basket) => res.status(200).json({ basket: basket }))
		.catch(next)
})

// CREATE
// POST /baskets
router.post('/baskets', (req, res, next) => {
	Basket.create(req.body.basket)
		.then((basket) => {
			res.status(201).json({ basket: basket })
		})
		.catch(next)
})

// UPDATE
// PATCH /baskets/5a7db6c74d55bc51bdf39793
router.patch('/baskets/:id', (req, res, next) => {
	Basket.findById(req.params.id)
		.then(handle404)
		.then((basket) => {
			return basket.updateOne(req.body.basket)
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})



// DESTROY
// DELETE /baskets/:id
router.delete('/baskets/:id', (req, res, next) => {
	Basket.findById(req.params.id)
		.then(handle404)
		.then((basket) => {
			basket.deleteOne()
		})
		.then(() => res.sendStatus(204))
		.catch(next)
})

// exporting the router to use elsewhere
module.exports = router
