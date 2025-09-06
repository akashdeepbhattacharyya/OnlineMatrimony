import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { Client, IMessage } from '@stomp/stompjs';
import { baseUrl } from "../HttpClient";
import * as Storage from "@/services/local-storage";

export default function useMessaging(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [readReceipts, setReadReceipts] = useState<any>({});
  const stompClientRef = useRef<Client | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccessToken() {
      const token: string | null = await Storage.getItem("ACCESS_TOKEN");
      setAccessToken(token);
    }
    fetchAccessToken();
  }, []);

  useEffect(() => {
    if (!accessToken) return;
    console.log("Connecting to WebSocket...");
    console.log({ conversationId });
    console.log({ accessToken });
    const stompClient = new Client({
      brokerURL: undefined, // will use webSocketFactory
      webSocketFactory: () => new SockJS(`${baseUrl()}/ws`),
      connectHeaders: { Authorization: `Bearer ${accessToken}` },
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("✅ Connected to WS");
        // Subscribe to new messages
        stompClient.subscribe(`/topic/chat/${conversationId}`, (msg: IMessage) => {
          const body = JSON.parse(msg.body);
          setMessages((prev) => [...prev, body]);
        });
        // Subscribe to typing events
        stompClient.subscribe(`/topic/chat/${conversationId}/typing`, (msg: IMessage) => {
          const typing = JSON.parse(msg.body);
          setTypingUsers((prev) => ({
            ...prev,
            [typing.userId]: typing.typing,
          }));
        });
        // Subscribe to read receipts
        stompClient.subscribe(`/topic/chat/${conversationId}/read`, (msg: IMessage) => {
          const receipt = JSON.parse(msg.body);
          setReadReceipts(receipt);
        });
      },
      onStompError: (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
      },
    });
    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      console.log("❌ Disconnected");
    };
  }, [accessToken, conversationId]);

  // Broadcast typing via WS
  const sendTyping = (isTyping: boolean) => {
    if (!stompClientRef.current || !stompClientRef.current.connected) return;
    stompClientRef.current.publish({
      destination: "/app/chat/typing",
      headers: { Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ conversationId, typing: isTyping })
    });
  };

  return { messages, typingUsers, readReceipts, sendTyping };
}