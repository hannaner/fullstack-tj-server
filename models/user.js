const mongoose = require('mongoose')
const itemSchema = require('./item')

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        token: String
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, user) => {
                delete user.password
                return user
            }
        }
    }
)

module.exports = mongoose.model('User', userSchema)