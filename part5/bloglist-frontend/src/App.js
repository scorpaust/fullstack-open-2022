import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import { getAll, setToken, create, update, remove } from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
    }, 3000)
    return () => {
      clearTimeout(timer)
    }
  }, [message])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(`[error] ${exception.response.data.error}`)
    }
  }

  const handleLogout = async () => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlog = (newBlog) => {
    const newBlogObject = { ...newBlog, likes: 0, user: user }

    create(newBlogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    })
  }

  const updateLikes = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await update(id, blogToUpdate)
      const newBlogs = blogs.map((blog) =>
        blog.id === id ? updatedBlog : blog
      )
      setBlogs(newBlogs)
    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      await remove(blogId)

      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      setBlogs(updatedBlogs)
      setMessage('Blog removed')
    } catch (exception) {
      setMessage('error' + exception.response.data.error)
    }
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      {user === null ? (
        loginForm()
      ) : (
        <>
          <div>
            <p>
              {user.username} logged-in
              <button onClick={handleLogout}>logout</button>
            </p>
          </div>
          {blogs && (
            <BlogList
              blogs={blogs}
              updateLikes={updateLikes}
              deleteBlog={deleteBlog}
              username={user.username}
            />
          )}
          <Togglable
            buttonLabel='create new blog'
            cancelLabel='cancel'
            ref={blogFormRef}
          >
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </>
      )}
    </div>
  )
}

export default App
