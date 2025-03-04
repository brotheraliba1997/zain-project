import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET API Call
export const fetchData = createAsyncThunk("api/fetchData", async () => {
  const response = await axios.get("/api/data"); // Calls Next.js API
  return response.data;
});

// POST API Call
export const postData = createAsyncThunk("api/postData", async (newData) => {
  const response = await axios.post("/api/data", newData);
  return response.data;
});

// Create Redux Slice
const apiSlice = createSlice({
  name: "api",
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(postData.fulfilled, (state, action) => {
        state.data.push(action.payload);
      });
  },
});

export default apiSlice.reducer;
