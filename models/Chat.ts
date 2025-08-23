export type Chat = {
  id: string;
  name: string;
  msg: string;
  time: string;
  unread: number;
  image: string;
};

export type Message = {
  id: string;
  text: string;
  time: string;
  sender: 'me' | 'them';
  avatar?: string;
};
