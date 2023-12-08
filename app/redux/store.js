import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "./slices/postsSlice";

export const store = configureStore({
  reducer: {
    // Define a top-level state field named `todos`, handled by `todosReducer`
    posts: postsSlice,
  },
});
