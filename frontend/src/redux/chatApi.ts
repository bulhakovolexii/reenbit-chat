import { api } from "./api";
import type { Chat } from "../types/types";

interface AddChatRequest {
  firstName: string;
  lastName: string;
}

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query<Chat[], void>({
      query: () => "/chats",
      providesTags: ["Chats"],
    }),
    addChat: builder.mutation<Chat, AddChatRequest>({
      query: (body) => ({
        url: "/chats",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chats"],
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

export const { useGetChatsQuery, useAddChatMutation, useDeleteChatMutation } =
  chatApi;
