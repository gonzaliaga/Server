const mongoose = require('mongoose')
const bcrytp = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_JWT

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date },
    mail: { type: String, required: true },
    password: { type: String, required: true },
    salt: String
})

userSchema.methods.hashPassword = function (password) {
    this.password = bcrytp.hashSync(password, 16)
}

userSchema.methods.generateJWT = function () {
    return jwt.sign({ userId: this._id }, secret)
}

userSchema.methods.onSignUpGenerateJWT = function () {
    return {
        userId: this._id,
        token: this.generateJWT()
    }
}

const User = mongoose.model('User', userSchema)
module.exports = User