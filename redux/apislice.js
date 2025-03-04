
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a single API slice to handle multiple APIs
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    // GET Request (Fetch All Data)
    getStocks: builder.query({
      query: () => "/data",
    }),

    // POST Request (Add New Data)
    addStock: builder.mutation({
      query: (newStock) => ({
        url: "/data",
        method: "POST",
        body: newStock,
      }),
    }),

  }),
});

export const { useGetStocksQuery, useAddStockMutation, } = apiSlice;

export default apiSlice.reducer;
