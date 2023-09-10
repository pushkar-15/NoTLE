const express = require('express')

const router = express.Router()
// const Blog = require('../models/blogModel')

const {
    getBlogs,
    getBlog,
    createBlog,
    deleteBlog,
    updateBlog
} = require('../controllers/blogController')


//GET all blogs
router.get('/', getBlogs)

//GET a single blog
router.get('/:id', getBlog)

//POST a single blog
router.post('/', createBlog)

//UPDATE a blog
router.patch('/:id', updateBlog)

//DELETE a blog
router.delete('/:id', deleteBlog)

module.exports = router