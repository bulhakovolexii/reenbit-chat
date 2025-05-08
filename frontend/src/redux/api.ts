import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001/api",
    credentials: "include",
  }),
  tagTypes: ["Auth", "Chats", "Messages"],
  endpoints: () => ({}),
});
