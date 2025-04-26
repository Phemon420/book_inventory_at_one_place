// store.ts
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slice/postSlice';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;