import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({ url: "auth/logout", method: "POST" }),
    }),
    checkAuth: builder.query({
      query: () => "/auth/check",
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApi;
