"use client";

import { useSelector, useDispatch } from "react-redux";
import { addPost, deletePost } from "../redux/slices/postsSlice";
import { useState } from "react";

const Posts = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch(); // how to dispatch actions to redux store

  const handleAddPost = (e) => {
    e.preventDefault();

    if (!title && !description) return;

    const newPost = {
      id: new Date().getTime(),
      title,
      description,
    };

    dispatch(addPost(newPost));

    setTitle("");
    setDescription("");
  };

  const posts = useSelector((state) => state.posts); // how to get data from redux store

  return (
    <div className="flex flex-col w-full max-w-xl gap-2 pt-6 mx-auto">
      <form className="flex flex-col w-full max-w-sm gap-2 px-3 py-2 mx-auto mb-6 bg-white border rounded-xl">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-4 py-2 text-white bg-neutral-700 rounded-2xl"
        />
        <textarea
          className="px-4 py-2 text-white bg-neutral-700 rounded-2xl whitespace-break-spaces"
          type="text"
          placeholder="Title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          onClick={handleAddPost}
          type="submit"
          className="px-4 py-2 text-white bg-green-500 rounded-2xl hover:bg-green-600"
        >
          Submit
        </button>
      </form>
      <h1 className="text-2xl">Posts</h1>
      {posts ? (
        posts.map((post) => (
          <div key={post.id} className="px-4 py-4 rounded shadow-2xl">
            <h2 className="pb-2 text-2xl font-bold">{post.title}</h2>
            <p className="ml-4 pt-2 bg-neutral-700 px-4 py-2 rounded-2xl text-white min-h-[80px]">
              {post.description}
            </p>
            <button
              className="justify-end px-3 py-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => dispatch(deletePost(post.id))}
            >
              Delete
            </button>
          </div>
        ))
      ) : (
        <p>No Posts</p>
      )}
    </div>
  );
};

export default Posts;
