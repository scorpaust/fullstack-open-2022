import { useState } from "react";
import { update } from "../services/blogs";
import Togglable from "./Togglable";

const BlogDetails = ({ blog, id }) => {
  const [newBlog, setNewBlog] = useState(blog);

  const handleLikes = async () => {
    const newBlogToUpdate = { ...blog, likes: blog.likes + 1 };
    await update(id, newBlogToUpdate);
    setNewBlog(newBlogToUpdate);
  };

  return (
    <div>
      <Togglable buttonLabel="view" cancelLabel="hide">
        <p>{newBlog.url}</p>
        <p>
          likes: {newBlog.likes} <button onClick={handleLikes}>like</button>
        </p>
      </Togglable>
    </div>
  );
};

export default BlogDetails;
