export type Conversation = {
  convId: number;
  user1Id: number;
  user2Id: number;
  matchId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  otherUserProfile: {
    userId: number;
    fullName: string;
    isHide: boolean;
  };
  lastMessage?: Message;
  unreadCount: number;
};

export type Message = {
  id: number;
  conversationId: number;
  senderId: number;
  senderName: string;
  receiverId: number;
  message: string;
  messageType: 'TEXT';
  isRead: boolean;
  sentAt: string;
};

export type StartChat = {
  conversationId: number;
  user1Id: number;
  user2Id: number;
  matchId: number;
  active: boolean;
};