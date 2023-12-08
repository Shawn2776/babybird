import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    title: "Post 1",
    description: "This is the first post",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPosts(state, action) {
      state.push(...action.payload);
    },

    addPost(state, action) {
      state.push(action.payload);
    },

    updatePost(state, action) {
      const { id, title, description } = action.payload;
      const existingPost = state.findIndex((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.description = description;
      }
    },

    deletePost(state, action) {
      const postId = action.payload;
      return state.filter((post) => post.id !== postId);
    },
  },
});

export const { addPost, deletePost, addPosts, updatePost } = postsSlice.actions;
export default postsSlice.reducer;
