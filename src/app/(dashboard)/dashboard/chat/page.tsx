"use client";
import React, { useState, useEffect } from "react";
import { useChat } from "ai/react";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit: originalHandleSubmit,
  } = useChat();
  const [isRateLimited, setIsRateLimited] = useState(false);

  // Función modificada para incluir el rate limiting
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (isRateLimited) {
      e.preventDefault();
      alert("Please wait before sending another message.");
      return;
    }

    originalHandleSubmit(e);
    setIsRateLimited(true);
  };

  // Controla el tiempo de espera antes de que se pueda enviar otro mensaje
  useEffect(() => {
    if (isRateLimited) {
      const timer = setTimeout(() => {
        setIsRateLimited(false);
      }, 5000); // Establece el tiempo de espera en 5000 milisegundos (5 segundos)

      return () => clearTimeout(timer);
    }
  }, [isRateLimited]);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
          // Deshabilita el input cuando el rate limiting está activo
          disabled={isRateLimited}
        />
      </form>
    </div>
  );
}
