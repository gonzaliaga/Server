const User = require('../models/User.model')
const bcrypt = require('bcrypt')

const signUp = async (req, res) => {
    try {
        const { mail, password } = req.body
        const existingUser = await User.findOne({mail})
        if(existingUser){
            return res.json({
                message: "User already exists" 
            })
        }
        const user = new User (req.body)
        user.hashPassword(password)
        const resp = await user.save()
        return res.json({
            massage: 'User was created successfully',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const login = async (req, res) => {
    try {
        const { mail, password } = req.body
        const userFound = await User.findOne({ mail })
        if(!userFound){
            return res.json({
                message: "User not found"
            })
        }
        const isCorrectPassword = await bcrypt.compareSync(password, userFound.password)
        if(!isCorrectPassword) {
            return res.json({
                message: "Wrong password"
            })
        }
        return res.json({
            message: "Ok",
            detail: { user: userFound, token: userFound.generateJWT() }
        })
    } catch (error) {
        return res.json({
            message: "Error",
            detail: error.massage
        })
    }
}

const getUser = async (req, res) => {
    try {
        const resp = await User.find()
        return res.json({
            message: "Users",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const newData = req.body
        const resp = await User.findByIdAndUpdate(
            newData.userId,
            { $set: newData },
            { new: true })
        return res.json({
            massage: "User was update successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const resp = await User.findByIdAndDelete(req.body.userId)
        return res.json({
            massage: "User was deleted successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

module.exports = {
    signUp,
    login,
    getUser,
    updateUser,
    deleteUser
}