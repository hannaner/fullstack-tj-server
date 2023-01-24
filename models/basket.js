const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = require('./item')

const basketSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		// when you see arrays in JS, think of many
		items: [itemSchema],
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
	},
	{
		timestamps: true,
	}
)

const Basket = mongoose.model('Basket', basketSchema)
module.exports = Basket