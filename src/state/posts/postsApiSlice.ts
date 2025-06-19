// using api query
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { Post } from '@/interfaces';

export const postSlice = createApi({
  reducerPath: 'fetchPosts',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Array<Post>, { limit: number; offset: number }>({
      query: ({ limit, offset }) => `/posts?_limit=${limit}&_offset=${offset}`,
    }),
    newPost: builder.mutation<Post, Omit<Post, 'id' | 'userId'>>({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
        headers: { 'Content-Type': 'application/json' },
      }),
    }),
  }),
});

export const { useGetPostsQuery, useNewPostMutation } = postSlice;
