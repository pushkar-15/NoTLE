const { default: mongoose } = require('mongoose')
const Blog = require('../models/blogModel')

//get all blogs
const getBlogs = async (req, res) => {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }) // TODO: add dynamic sort & filter options
    res.status(200).json(blogs)
}

//get a blog
const getBlog = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.satus(404).json({ error: "No such id found" })
    }

    const blog = await Blog.findById(id)
    if (!blog) {
        return res.satuts(404).json({ error: "No such id of a blog found" })
    }

    res.status(200).json(blog)
}

//create a blog
const createBlog = async (req, res) => {
    const { title, problem, approach } = req.body

    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!problem) {
        emptyFields.push('problem')
    }
    if (!approach) {
        emptyFields.push('approach')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }

    //add doc to db
    try {
        const blog = await Blog.create({ title, problem, approach })
        res.status(200).json(blog)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a blog
const deleteBlog = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such blog' })
    }

    const blog = await Blog.findOneAndDelete({ _id: id })

    if (!blog) {
        return res.status(400).json({ error: 'No such blog' })
    }

    res.status(200).json(blog)
}

//update a blog
const updateBlog = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such blog' })
    }

    const blog = await Blog.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!blog) {
        return res.status(400).json({ error: 'No such blog' })
    }

    res.status(200).json(blog)
}


module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
}