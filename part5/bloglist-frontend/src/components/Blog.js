import { useState } from "react";

const Blog = ({ blog, updateLikes, deleteBlog, username }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    updateLikes(blog.id, blogToUpdate);
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id);
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <span className="title">{blog.title} - </span>
        <span className="author">{blog.author}</span>{" "}
        <button id="view-btn" onClick={toggleVisibility}>
          {visible ? "hide" : "show"}
        </button>
      </div>
      {visible && (
        <div>
          <div>{blog.url}</div>
          <div>
            Likes: {blog.likes}{" "}
            <button id="like-btn" onClick={handleLike}>
              like
            </button>{" "}
          </div>
          <div>
            <div>{blog.user.name}</div>
            {blog.user.username === username && (
              <button id="delete-btn" onClick={handleDelete}>
                delete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;
