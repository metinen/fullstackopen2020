import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/logins'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUsers] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUsers(user);
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault();
    const credentials = { username, password }
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUsers(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log(error)
    }

  }

  const handleLogout = () => {
    window.localStorage.setItem('loggedInUser', null);
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
      <h2>blogs</h2>
      <p>{`Hello ${user.name}`} <button onClick={handleLogout}>Logout</button></p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App