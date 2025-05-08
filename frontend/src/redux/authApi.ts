import { api } from "./api";
import type { User, LoginCredentials, SignupCredentials } from "../types/types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<User, SignupCredentials>({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation<User, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "auth/logout", method: "POST" }),
      invalidatesTags: ["Auth"],
    }),
    checkAuth: builder.query<User, void>({
      query: () => "/auth/check",
      providesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
} = authApi;
