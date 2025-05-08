import { api } from "./api";
import type { Chat } from "../types/types";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      query: () => "/chats",
      providesTags: ["Chats"],
    }),
    deleteChat: builder.mutation<{ message: string }, string>({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chats", "Messages"],
    }),
  }),
});

export const { useGetChatsQuery, useDeleteChatMutation } = chatApi;
