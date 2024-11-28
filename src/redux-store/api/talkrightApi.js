'use client'; // Add this line
// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints

export const talkrightApi = createApi({

    reducerPath: 'talkrightApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),

    endpoints: (builder) => ({

        //================================User Api==============================

        user_add: builder.mutation({
            query: (formData) => ({
                url: '/apps/user/add',
                method: 'POST',
                body: formData,
            }),
        }),
        getUserById: builder.mutation({
            query: (formData) => ({
                url: '/apps/user/edit-list',
                method: 'POST',
                body: formData,
            }),
        }),
        getUserList: builder.query({
            query: () => '/apps/user/list',
            transformResponse: (response) => response.data,
        }),
        updateUser: builder.mutation({
            query: (formData) => ({
                url: '/apps/user/update',
                method: 'POST',
                body: formData,
            }),
        }),
        deleteUser: builder.mutation({
            query: (data) => ({
                url: `/apps/user/delete`,
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                },
                body: data,
            }),
        }),

        //================================End User Api==============================
        calender: builder.mutation({
            query: (data) => ({
                url: `/apps/calender`,
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: data
            })
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const {
    useCalenderMutation,
    useUser_addMutation,
    useGetUserListQuery,
    useGetUserByIdMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = talkrightApi
