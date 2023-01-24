const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema(
    {
        itemName: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
            max: 15
        },
        basket: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Basket'
        }
    }, {
        timestamps: true
    }
)


module.exports = itemSchema