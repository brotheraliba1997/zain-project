
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authQuery = fetchBaseQuery({
  baseUrl: "https://jsonplaceholder.typicode.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; 
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
      headers.set("Content-Type", "application/json");
    }
    return headers;
  },
});

export const loginApi = createApi({
  reducerPath: "loginApi", 
  baseQuery: fetchBaseQuery({ baseUrl: "https://jsonplaceholder.typicode.com" }),
  endpoints: (builder ) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
        headers: { "Content-Type": "application/json" }, 
      }),
    }),
  }),
});

export const logoutApi = createApi({
  reducerPath: "logoutApi", 
  baseQuery: authQuery, 
  endpoints: (builder) => ({
    logoutUser: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useLoginUserMutation } = loginApi;
export const { useLogoutUserMutation } = logoutApi;
