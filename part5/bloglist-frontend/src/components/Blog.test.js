import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  const blog = {
    title: "Nice Blog",
    author: "Dinis Costa",
    url: "https://www.very-nice-blog.pt/",
    likes: 0,
    user: {
      username: "dinismcosta81",
      name: "Dinis Costa",
    },
  };

  let component;
  const likeMockHandler = jest.fn();
  const deleteMockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        updateLikes={likeMockHandler}
        deleteBlog={deleteMockHandler}
        username={blog.user.username}
      />
    );
  });

  test("renders title and author but not url or likes by default", () => {
    expect(component.container.querySelector("#title")).toHaveTextContent(
      blog.title
    );
    expect(component.container.querySelector("#author")).toHaveTextContent(
      blog.author
    );
    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText("like")).not.toBeInTheDocument();
  });

  test("blog url and number of likes are shown when the button controlling the shown details has been clicked", () => {
    const button = component.container.querySelector("#view-btn");

    fireEvent.click(button);

    expect(component.queryByText(blog.url)).toBeInTheDocument();
    expect(component.queryByText("like")).toBeInTheDocument();
  });

  test("if the like button is clicked twice, the event handler the component received as props is called twice", () => {
    const viewButton = component.container.querySelector("#view-btn");

    fireEvent.click(viewButton);

    const likeButton = component.container.querySelector("#like-btn");

    fireEvent.click(likeButton);

    fireEvent.click(likeButton);

    expect(likeMockHandler.mock.calls).toHaveLength(2);
  });
});
