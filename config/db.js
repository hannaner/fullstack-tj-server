const mongooseBaseName = 'tj-shopping-list'

const database = {
    development: `mongodb://127.0.0.1:27017/${mongooseBaseName}-development`,
    test: `mongodb://127.0.0.1:27017/${mongooseBaseName}-test`
}

const localDb = process.env.TESTENV ? database.test : database.development

const currentDb = process.env.DB_URI || localDb

module.exports = currentDb