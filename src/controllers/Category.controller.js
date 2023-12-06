const Category = require('../models/Category.model')

const createCategory = async (req, res) => {
    try {
        const category = new Category (req.body)
        const resp = await category.save()
        return res.json({
            massage: 'Category was created successfully',
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const getCategories = async (req, res) => {
    try {
        const resp = await Category.find()
        return res.json({
            message: "Categories",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const updateCategory = async (req, res) => {
    try {
        const newData = req.body
        const resp = await Category.findByIdAndUpdate(
            newData.categoryId,
            { $set: newData },
            { new: true })
        return res.json({
            massage: "Category was update successfully",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.massage
        })
    }
}

const deleteCategory = async (req, res) => {
    try {
        const resp = await Category.findByIdAndDelete(req.body.categoryId)
        return res.json({
            massage: "Category was deleted successfully",
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
    createCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
}