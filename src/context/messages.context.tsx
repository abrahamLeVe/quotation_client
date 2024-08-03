"use client";
import { getRandomMessage } from "@/hooks/useSpeech";
import { nanoid } from "nanoid";
import { ReactNode, createContext, useState } from "react";
import { Messages } from "@/lib/validations/message";

const defaultValue: Messages[] = [
  {
    id: nanoid(),
    role: "assistant",
    content: getRandomMessage(),
    createdAt: new Date().toISOString(),
  },
];

export const MessagesContext = createContext<{
  messages: Messages[];
  isMessageUpdating: boolean;
  addMessage: (message: Messages) => void;
  addAssistantMessage: (content: string) => void;
  removeMessage: (id: string) => void;
  updateMessage: (
    id: string,
    updateFn: (prevContent: string) => string
  ) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => {},
  addAssistantMessage: () => {},
  removeMessage: () => {},
  updateMessage: () => {},
  setIsMessageUpdating: () => {},
});

export function MessagesProvider({ children }: { children: ReactNode }) {
  const [isMessageUpdating, setIsMessageUpdating] = useState<boolean>(false);
  const [messages, setMessages] = useState<Messages[]>(defaultValue);

  const addMessage = (message: Messages) => {
    setMessages((prev) => [...prev, message]);
  };

  const addAssistantMessage = (content: string) => {
    const message: Messages = {
      id: nanoid(),
      role: "assistant",
      content: content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (
    id: string,
    updateFn: (prevContent: string) => string
  ) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, content: updateFn(message.content) };
        }

        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        addAssistantMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
