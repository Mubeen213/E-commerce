const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./custom-api.js')

class NotFoundError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCodes = StatusCodes.NOT_FOUND
    }
}

module.exports = NotFoundError;