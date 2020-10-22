let groupBy = require('lodash/groupBy');

const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => acc + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.sort((a, b) => a.likes - b.likes).pop()
}


const mostBlogs = (blogs) => {
    return blogs
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
}