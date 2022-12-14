import Blog from './Blog'

const BlogList = ({ blogs, updateLikes, deleteBlog, username }) => {
  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikes={updateLikes}
            deleteBlog={deleteBlog}
            username={username}
          />
        ))}
    </div>
  )
}

export default BlogList
