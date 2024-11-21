"use client";

import { useChat } from "ai/react";
import MessageContainer from "./MessageCotainer";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  return (
    <div
      style={{
        maxWidth: "100vw",
        margin: "0 auto",
        backgroundColor: "white",
        borderRadius: "8px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        height: "100vh",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          padding: "16px",
          backgroundColor: "#1e88e5",
          color: "white",
          margin: 0,
        }}
      >
        Message Container Demo
      </h1>
      <div style={{ padding: "16px" }}>
        {messages.map((message) => (
          <MessageContainer
            key={message.id}
            sender={message.role === "user" ? "user" : "AI"}
            timestamp={new Date()}
            content={message.content}
          />
        ))}

      </div>
      {isLoading ? (
          <div className="loading-message">AI is typing...</div>
        ) : null}
      <form className={"message-form"} onSubmit={handleSubmit}>
        <input
          className="message-input"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
        <button className="send-button" type="submit" disabled={!input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
