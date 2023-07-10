const { StatusCodes } = require('http-status-codes')
const {BadRequestError, UnauthenticatedError} = require('../errors')
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const {attachCookieToResponse} = require('../utils/index')

const register = async (req, res) => {

    const { name, email, password } = req.body;
    const userAlreadyExist = await User.findOne({ email });
    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all the fields');
    }
    if (userAlreadyExist) {
        throw new BadRequestError('Email already exist');
    }

    // first registerd user is an admin
    const isFirstAccount = await User.countDocuments({}) == 0
    const role = isFirstAccount ? 'admin' : 'user';
    
    const user = await User.create({ name, email, password, role });
    const tokenUser = { name: user.name, userId: user._id, role: user.role }
    attachCookieToResponse({res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({
        user: tokenUser
    });
}

const login = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide all the fields');
    }

    const user = await User.findOne({ email });

    if(!user) {
        throw new UnauthenticatedError('Invalid credentials');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect) {
         throw new UnauthenticatedError('Invalid credentials');
    }
    
    const tokenUser = {name: user.name, userId: user._id, role: user.role};
    attachCookieToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json({
        user
    })
}


const logout = async (req, res) => {
    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.status(StatusCodes.OK).json({
        message: 'Logged out successfully'
    })
}
module.exports = {
    register,
    login,
    logout
}