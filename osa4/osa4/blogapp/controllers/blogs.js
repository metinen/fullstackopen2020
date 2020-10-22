const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { blogs: 0 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(request.body.user)

    const blog = new Blog({
        title: body.title,
        author: body.title,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    user.save()

    response.status(201).json(result)
})

module.exports = blogsRouter