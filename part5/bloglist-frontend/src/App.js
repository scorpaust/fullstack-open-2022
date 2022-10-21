import { useState, useEffect } from 'react'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import { getAll, setToken, create } from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
  
      setToken(user.token)    
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(`[error] ${exception.response.data.error}`)
      setTimeout(() => {        
        setMessage(null)      
      }, 5000)
    }
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
    
    const newBlogObject = {...newBlog, likes: 0, user: user}

    create(newBlogObject)      
      .then(returnedBlog => {        
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`) 
        setTimeout(() => {        
          setMessage(null)      
        }, 5000)         
    })  
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      { user == null ?
        loginForm() 
        :
        <>
          <div>
            <p>{user.username} logged-in</p>
          </div>
          { blogs &&
            <BlogList blogs={blogs} />
          }
          <BlogForm addBlog={addBlog} />
        </>
      }
    </div>
  )
}

export default App
