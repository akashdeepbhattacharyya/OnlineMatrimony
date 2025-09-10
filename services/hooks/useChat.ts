import { useState } from 'react';
import { Conversation, Message } from '@/models/Chat';
import { useChatRepository } from '../api/repositories/useChatRepository';

export const useChat = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [data, setData] = useState<Conversation[] | Message[] | undefined>(undefined);
  const chatRepository = useChatRepository();

  const getConversations = async () => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await chatRepository.getConversations();
      setData(response);
      return response;
    } catch (err: any) {
      console.error('Get pending matches error:', err);
      setError(err.message || 'Failed to fetch pending matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getChatHistory = async (conversationId: number, page: number, size: number) => {
    setLoading(true);
    setError(undefined);
    setData(undefined);

    try {
      const response = await chatRepository.getChatHistory(conversationId, page, size);
      setData(response.content);
      return response.content;
    } catch (err: any) {
      console.error('Get send matches error:', err);
      setError(err.message || 'Failed to fetch send matches');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
    getConversations,
    getChatHistory,
  };
};
