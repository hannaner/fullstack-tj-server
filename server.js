const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const db = require('./config/db')
const PORT = 8000

const itemRoutes = require('./routes/item-routes')

mongoose.set('strictQuery', true)

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express()

app.use(cors({ origin: `http://127.0.0.1:5500`}))

app.use(express.json())
app.use(itemRoutes)

app.listen(PORT, () => {
    console.log(`listening in on ${PORT}`)
})

module.exports = app