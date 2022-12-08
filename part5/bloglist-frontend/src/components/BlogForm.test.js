import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const addBlog = jest.fn();
  const user = userEvent.setup();

  const { container } = render(<BlogForm addBlog={addBlog} />);

  const titleInput = container.querySelector("#title");
  const authorInput = container.querySelector("#author");
  const urlInput = container.querySelector("#url");
  const saveButton = container.querySelector("#create-blog");

  await user.type(titleInput, "Big New Blog");
  await user.type(authorInput, "Dinis Costa");
  await user.type(urlInput, "https://www.dinis-costa.com");
  await user.click(saveButton);

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(addBlog.mock.calls[0][0].title).toBe("Big New Blog")
  expect(addBlog.mock.calls[0][0].author).toBe("Dinis Costa")
  expect(addBlog.mock.calls[0][0].url).toBe("https://www.dinis-costa.com")
})
