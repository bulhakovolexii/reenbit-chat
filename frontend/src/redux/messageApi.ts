import { api } from "./api";
import type { Message } from "../types/types";

interface SendMessageRequest {
  chatId: string;
  text: string;
}

interface UpdateMessageRequest extends SendMessageRequest {
  messageId: string;
}

interface DeleteMessageRequest {
  chatId: string;
  messageId: string;
}

let ws: WebSocket | null = null;
let wsPromise: Promise<WebSocket> | null = null;

const getWsConnection = () => {
  if (!wsPromise) {
    wsPromise = new Promise((resolve, reject) => {
      ws = new WebSocket("ws://localhost:5001/ws");
      ws.addEventListener("open", () => resolve(ws!));
      ws.addEventListener("error", reject);
    });
  }
  return wsPromise;
};

export const messageApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], string>({
      query: (chatId) => `/messages/${chatId}`,
      async onCacheEntryAdded(
        chatId,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const socket = await getWsConnection();

          const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.chatId === chatId) {
              updateCachedData((draft) => {
                draft.push(data.message);
              });
            }
          };

          socket.addEventListener("message", handleMessage);

          await cacheEntryRemoved;
          socket.removeEventListener("message", handleMessage);
        } catch (err) {
          console.error("WebSocket error:", err);
        }
      },
      providesTags: ["Messages"],
    }),
    sendMessage: builder.mutation<Message, SendMessageRequest>({
      query: ({ chatId, text }) => ({
        url: `/messages/${chatId}`,
        method: "POST",
        body: { text },
      }),
      invalidatesTags: ["Messages"],
    }),
    updateMessage: builder.mutation<Message, UpdateMessageRequest>({
      query: ({ chatId, messageId, text }) => ({
        url: `/messages/${chatId}/${messageId}`,
        method: "PUT",
        body: { text },
      }),
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation<{ message: string }, DeleteMessageRequest>({
      query: ({ chatId, messageId }) => ({
        url: `/messages/${chatId}/${messageId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useSendMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
