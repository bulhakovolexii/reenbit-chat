import { api } from "./api";

const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: () => "/chats",
      providesTags: ["Chats"],
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `/chats/${chatId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chats", "Messages"],
    }),
  }),
});

export const { useGetChatsQuery, useDeleteChatMutation } = chatApi;
