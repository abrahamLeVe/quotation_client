"use client";
import { MessagesContext } from "@/context/messages.context";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";
import { useContext } from "react";
import { Message } from "./validations/message";

const SendMessageMutation = () => {
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext);

  const {
    mutate: sendMessage,
    error,
    isPending,
  } = useMutation({
    mutationKey: ["sendMessage"],

    mutationFn: async (_message: Message) => {
      const response = await fetch("/api/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages }),
      });

      if (!response.ok) {
        const statusCode = response.status;
        const errorMessage = await response.text();
        throw new Error(`Server error: ${statusCode} - ${errorMessage}`);
      }

      return response.body;
    },
    onMutate: (message) => {
      if (message.text.trim() === "") {
        throw new Error("Empty message");
      }
      addMessage(message);
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream found");

      const id = nanoid();
      const responseMessage: Message = {
        id,
        isUserMessage: false,
        text: "",
      };

      addMessage(responseMessage);

      setIsMessageUpdating(true);

      const reader = stream.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        updateMessage(id, (prev) => prev + chunkValue);
      }

      setIsMessageUpdating(false);
    },
    onError(_, message) {
      removeMessage(message.id);
    },
  });

  return {
    isPending,
    sendMessage,
    error,
  };
};

export default SendMessageMutation;
