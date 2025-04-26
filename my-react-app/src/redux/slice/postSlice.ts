import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const Url = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Async thunk
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Url}/books?page=${page}&limit=30`);
      console.log("response hain:",response);
      return {
        posts: response.data.posts || [],
        totalPages: response.data.totalPages || 1,
        currentPage: page
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Slice
const postSlice = createSlice({
  name: 'posts',
  initialState: {
    currentItems: [] as any[],   // Array of posts
    loading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 1
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    clearPosts: (state) => {
      state.currentItems = [];
      state.currentPage = 1;
      state.totalPages = 1;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItems = action.payload.posts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setCurrentPage, clearPosts } = postSlice.actions;
export default postSlice.reducer;