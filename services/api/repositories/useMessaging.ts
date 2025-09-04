import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { over } from "stompjs";
import { baseUrl } from "../HttpClient";
import * as Storage from "@/services/local-storage";

export default function useMessaging(conversationId: string) {
  const [messages, setMessages] = useState<any[]>([]);
  const [typingUsers, setTypingUsers] = useState<Record<string, boolean>>({});
  const [readReceipts, setReadReceipts] = useState<any>({});
  const stompClientRef = useRef<ReturnType<typeof over> | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAccessToken() {
      const token: string | null = await Storage.getItem("ACCESS_TOKEN");
      setAccessToken(token);
    }
    fetchAccessToken();
  }, [])

  useEffect(() => {
    if (!accessToken) return;
    const socket = new SockJS(`${baseUrl()}/ws`);
    const stompClient = over(socket);
    stompClientRef.current = stompClient;

    stompClient.connect({ Authorization: `Bearer ${accessToken}` }, () => {
      console.log("✅ Connected to WS");

      // Subscribe to new messages
      stompClient.subscribe(`/topic/chat/${conversationId}`, (msg: any) => {
        const body = JSON.parse(msg.body);
        console.log({ body });
        setMessages((prev) => [...prev, body]);
      });

      // Subscribe to typing events
      stompClient.subscribe(`/topic/chat/${conversationId}/typing`, (msg: any) => {
        const typing = JSON.parse(msg.body);
        setTypingUsers((prev) => ({
          ...prev,
          [typing.userId]: typing.typing,
        }));
      });

      // Subscribe to read receipts
      stompClient.subscribe(`/topic/chat/${conversationId}/read`, (msg: any) => {
        const receipt = JSON.parse(msg.body);
        setReadReceipts(receipt);
      });
    });

    return () => {
      stompClient.disconnect(() => console.log("❌ Disconnected"));
    };
  }, [accessToken, conversationId]);  

  // Broadcast typing via WS
  const sendTyping = (isTyping: boolean) => {
    if (!stompClientRef.current) return;
    stompClientRef.current.send(
      "/app/chat/typing",
      { Authorization: `Bearer ${accessToken}` },
      JSON.stringify({ conversationId, typing: isTyping })
    );
  };

  return { messages, typingUsers, readReceipts, sendTyping };
}