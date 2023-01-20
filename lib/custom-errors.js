class DocumentNotFoundError extends Error {
    constructor() {
        super()
        this.name = 'DocumentNotFoundError'
        this.message = 'The ID you provided does not match any document'
    }
}

const handle404 = (document) => {
    if (!document){
        throw new DocumentNotFoundError()
    } else {
        return document
    }
}

module.exports = {
    handle404
}