
const jwt = require('jsonwebtoken')

const createJWT = ({ payLoad }) => {
    const token = jwt.sign(payLoad, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME});
    return token
}

const isTokenValid = ({token}) => {
   return jwt.verify(token, process.env.JWT_SECRET)
}

const attachCookieToResponse = ({res, user}) => {
    const token = createJWT({payLoad: user})
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        signed: true
    })
}

module.exports = {
    createJWT,
    isTokenValid,
    attachCookieToResponse
}