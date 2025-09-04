import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Conversation, Message } from '@/models/Chat';

type ConversationState = {
  conversationList: Conversation[];
  chatHistory: { [conversationId: number]: Message[] };
};

const initialState: ConversationState = {
  conversationList: [],
  chatHistory: {},
};

export const fetchConversations = createAsyncThunk(
  `conversation/fetchConversations`,
  async (
    { getConversations }: { getConversations: () => Promise<Conversation[]> },
    thunkAPI,
  ) => {
    try {
      const response = await getConversations();
      return response;
    } catch {
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

export const fetchChatHistory = createAsyncThunk(
  `conversation/fetchChatHistory`,
  async (
    {
      getChatHistory,
      conversationId,
      page,
      size,
    }: {
      getChatHistory: (conversationId: number, page: number, size: number) => Promise<Message[]>;
      conversationId: number;
      page: number;
      size: number;
    },
    thunkAPI,
  ) => {
    try {
      const response = await getChatHistory(conversationId, page, size);
      return {
        conversationId,
        messages: response,
      };
    } catch (e) {
      console.error('Error fetching messages:', e);
      return thunkAPI.rejectWithValue({ status: false, data: undefined });
    }
  },
);

const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    setConversationList(state, action: PayloadAction<Conversation[]>) {
      state.conversationList = action.payload;
    },
    setMessagesForConversation(state, action: PayloadAction<{ conversationId: number; messages: Message[] }>) {
      const { conversationId, messages } = action.payload;
      state.chatHistory[conversationId] = messages;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchConversations.fulfilled, (state, action) => {
      state.conversationList = action.payload;
    });
    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      if (action.payload.messages.length > 0) {
        const conversationId = action.payload.conversationId;
        state.chatHistory[conversationId] = action.payload.messages;
      }
    });
  },
});

export const { setConversationList, setMessagesForConversation } = conversationSlice.actions;
export default conversationSlice.reducer;
