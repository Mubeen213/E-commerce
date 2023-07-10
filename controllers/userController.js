const {StatusCodes} = require('http-status-codes')
const User = require('../models/User')
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors')

const getAllUsers = async (req, res) => {

    const users = await User.find({role: 'user'}).select('-password')
    console.log(users)
    res.status(StatusCodes.OK).json({
        users: users
    })
}

const getSingleUser  = async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({_id: id}).select('-password')

    if(!user) {
        throw new NotFoundError(`No user with id ${id}`)
    }
    res.status(StatusCodes.OK).json(user)
}

const showCurrentUser = (req, res) => {
    
    res.send("Show current user");
}


const updateUser = (req, res) => {
    res.send("Update user");
}

const deleteUser = (req, res) => {
    res.send("Delete user");
}

const updateUserPassword = (req, res) => {
    res.send("Update user password");
}

module.exports = {
    getSingleUser,
    getAllUsers,
    showCurrentUser,
    updateUser,
    deleteUser,
    updateUserPassword
}