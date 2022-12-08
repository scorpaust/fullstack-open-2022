import { useState } from 'react'
import './BlogForm.styles.css'

const BlogForm = ({ addBlog }) => {

  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

  const handleBlogTitleChange = (event) => {
    setNewBlog({ ...newBlog, title: event.target.value })
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlog({ ...newBlog, author: event.target.value })
  }

  const handleBlogUrlChange = (event) => {
    setNewBlog({ ...newBlog, url: event.target.value })
  }

  const handleBlogSubmit = (event) => {
    event.preventDefault()
    addBlog(newBlog)
    setNewBlog({ title: '', author: '', url: '' })
  }

  return (
    <div className="form-container">
      <h2>create new</h2>
      <form className="blog-form" onSubmit={handleBlogSubmit}>
        <div className="column">
          <div className="row">
            <label htmlFor="title">title:</label>
            <input id="title" name="title" type="text"
              value={newBlog.title}
              onChange={handleBlogTitleChange}
            />
          </div>
          <div className="row">
            <label htmlFor="author">author:</label>
            <input id="author" name="author" type="text"
              value={newBlog.author}
              onChange={handleBlogAuthorChange}
            />
          </div>
          <div className="row">
            <label htmlFor="url">url:</label>
            <input id="url" name="url" type="text"
              value={newBlog.url}
              onChange={handleBlogUrlChange}
            />
          </div>
          <div className="row">
            <button id="create-blog" type="submit">save</button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default BlogForm