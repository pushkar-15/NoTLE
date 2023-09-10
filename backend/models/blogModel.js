const mongoose = require('mongoose')
const Schema = mongoose.Schema

/*
    TODO:

    -to schema, 
        add difficulty tag, 
        problem source list, 
        code (leetcode link), 
        markdown textbox (?), 
        picture insertion (maybe in textbox itself)

    -nest objects to add multiple approaches and codes
*/

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    approach: {
        type: String,
    }
},
    { timestamps: true })

module.exports = mongoose.model('blog', blogSchema)