import React, { useState, useEffect } from "react";
import MessageBubbleMe from "./MessageBubbleMe";
import MessageBubbleFriend from "./MessageBubbleFriend";
import { useGlobalStore } from "@/core/store";

const MessageBubble = ({ message }) => {
  const [showTyping, setShowTyping] = useState(false);
  const messagesTyping = useGlobalStore(state => state.messagesTyping);

  useEffect(() => {
    if (messagesTyping === null) {
      setShowTyping(false);
      return;
    }
    setShowTyping(true);
    const check = setInterval(() => {
      const now = new Date();
      const ms = now - messagesTyping;
      if (ms > 10000) {
        setShowTyping(false);
      }
    }, 1000);
    return () => clearInterval(check);
  }, [messagesTyping]);

  if (message.id === -1) {
    if (showTyping) {
      return <MessageBubbleFriend typing={true} />;
    }
    return null;
  }

  return message.is_me ? (
    <MessageBubbleMe text={message.text} />
  ) : (
    <MessageBubbleFriend text={message.text}  />
  );
};

export default MessageBubble;