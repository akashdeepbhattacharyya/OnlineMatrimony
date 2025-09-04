import { handleApiResponse } from '@/utils/handleApiResponse';
import { apiClient } from '../HttpClient';
import { Conversation, Message } from '@/models/Chat';
import { PagedResponse } from '@/models/ApiResponse';

export function useChatRepository() {

  const getConversations = async (): Promise<Conversation[]> => {
    return handleApiResponse(apiClient.get(`/chat/conversations`));
  };

  const getChatHistory = async (conversationId: number, page: number, size: number): Promise<PagedResponse<Message>> => {
    return handleApiResponse(apiClient.get(`/chat/messages?conversationId=${conversationId}&page=${page}&size=${size}`));
  };

  const startChat = async (receiverId: number): Promise<Conversation> => {
    return handleApiResponse(apiClient.post(`/chat/startChat/${receiverId}`));
  };

  const sendMessage = async (receiverId: string, message: string, messageType = "TEXT"): Promise<Message> => {
    return handleApiResponse(apiClient.post(`/chat/send`, { receiverId, message, messageType }));
  };

  return {
    getConversations,
    getChatHistory,
    startChat,
    sendMessage,
  };
}
