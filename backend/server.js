require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')
const app = express() // express app
const blogRoutes = require('./routes/blogs')



// middleware
app.use(express.json())
app.use((req, res, next) => {
    // console.log(req.path, req.method)
    next()
})

// api routes
app.use('/api/blogs', blogRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen on PORT
        app.listen(process.env.PORT, () => {
            console.log("connected to DB and listening on port", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
