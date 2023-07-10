
const express = require('express')
const userRouter = express.Router();
const {authorizePermissions, authenticateUser} = require('../middleware/authentication')
const {
    getSingleUser,
    getAllUsers,
    showCurrentUser,
    deleteUser,
    updateUserPassword
} = require('../controllers/userController')


userRouter.route('/').get(authenticateUser, authorizePermissions('admin'), getAllUsers);
userRouter.route('showMe').get(authenticateUser, showCurrentUser);
userRouter.route('/updateUserPassword').post(authenticateUser, updateUserPassword);
userRouter.route('/:id').get(authenticateUser, getSingleUser);
userRouter.route('/:id').delete(authenticateUser, deleteUser);

module.exports = userRouter;