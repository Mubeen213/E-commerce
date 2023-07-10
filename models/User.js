
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLenght: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
    },

    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 4
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }

},)

UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch =  await bcrypt.compare(candidatePassword, this.password)
    console.log(isMatch)
    return isMatch;
}
module.exports = mongoose.model('User', UserSchema);