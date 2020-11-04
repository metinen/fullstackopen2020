import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // keep logged in during refresh
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user);
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault();
    const credentials = { username, password }
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser');
  }

  const handleAddBlog = event => {
    event.preventDefault();
    const newBlog = { title, author, url }
    try {
      blogService.create(newBlog)
    } catch (error) {
      console.log(error)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input type="input" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            Password
            <input type="input" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{`Hello ${user.name}`} <button onClick={handleLogout}>Logout</button></p>
      <h2>Create new blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>Title: <input value={title} type="input" onChange={({ target }) => setTitle(target.value)} /></div>
        <div>Author: <input value={author} type="input" onChange={({ target }) => setAuthor(target.value)} /></div>
        <div>Url: <input value={url} type="input" onChange={({ target }) => setUrl(target.value)} /></div>
        <button type="submit">Create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App