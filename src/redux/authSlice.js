
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authQuery = fetchBaseQuery({
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

export const authentationApi = createApi({
    reducerPath: "authentationApi",
    baseQuery: authQuery,
    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
                headers: { "Content-Type": "application/json" },
            }),
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }),
        }),
    }),
});


export const { useLoginUserMutation,useLogoutUserMutation } = authentationApi;
