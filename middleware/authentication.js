
const { UnauthenticatedError, Unauthorized } = require('../errors/index');
const { isTokenValid } = require('../utils/jwt');


const authenticateUser = async (req, res, next) => {
    
    const token = req.signedCookies.token;

    console.log(token);
    if (!token) {
        throw new UnauthenticatedError('Authentication Invalid');
    }

    const { name, userId, role } = isTokenValid({ token });

    req.user = { name, userId, role };
    console.log(req.user);
    next();
}


const authorizePermissions = (...roles) => {
    console.log(roles)
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new Unauthorized('You do not have permission to perform this action');
        }
        next()
    }
}


module.exports = {
    authenticateUser,
    authorizePermissions
}