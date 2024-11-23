"use client";

import { useChat } from "ai/react";
import MessageContainer from "./MessageCotainer";
import { toast } from "react-hot-toast";
import { useCallback, useEffect, useRef, useState } from "react";
import { useModelConfig } from "@/contexts/ModelContext";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    stop,
  } = useChat();
  const bottomRef = useRef<Element>(null);
  const startTime = useRef(new Date().getTime());

  const {modelConfig} = useModelConfig();

  // Assumption: that a model has this fixed token limit,
  // this should ideally be configurable based on model used in streamText
  const maxTokens = useRef(8192);
  const [metrics, setMetrics] = useState({
    tokensPerSecond: 0,
    totalTokensUsed: 0,
    estimatedCompletionTime: 0,
  });

  // SideEffect to handle live metrics
  useEffect(() => {
    const tokensCount = messages.at(-1)?.content.split(" ").length || 0;
    const totalTime = new Date().getTime() - startTime.current;
    const tokensPerSecond = (tokensCount * 1000) / totalTime;
    const totalTokensUsed = getTotalTokenUsed(messages) || 0;
    const estimatedCompletionTime =
      (maxTokens.current - tokensCount) / tokensPerSecond;
    setMetrics((prevMetrics) => {
      return {
        ...prevMetrics,
        tokensPerSecond: parseFloat(tokensPerSecond.toFixed(1)),
        totalTokensUsed: totalTokensUsed.toFixed(),
        estimatedCompletionTime: parseFloat(estimatedCompletionTime.toFixed(1)),
      };
    });
  }, [messages]);

  useEffect(() => {
    console.log("isLoading =", isLoading);
    if (isLoading && bottomRef.current) {
      console.log("observing bottom ref");
      intersectionObserver.observe(bottomRef.current);
    } else {
      console.log("unobserving bottom ref");
      setTimeout(() => intersectionObserver.unobserve(bottomRef.current!), 0);
    }
  }, [isLoading]);

  const getTotalTokenUsed = (aiMessages) => {
    return aiMessages.reduce((acc, val) => {
      return (acc += val.content.split(" ").length);
    }, 0);
  };
  const intersectionObserver = new IntersectionObserver((entries) => {
    if (bottomRef.current) {
      const currentBottomRef = entries[0];
      if (!currentBottomRef.isIntersecting && isLoading) {
        console.log(" isLoading ", isLoading);
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  const handleFormSubmit = (event: { preventDefault?: () => void }) => {
    // event?.preventDefault();
    startTime.current = new Date().getTime();

    console.log('event =',event);
    handleSubmit(event, {data: {modelConfig: {...modelConfig}}});
  };

  const handleToast = useCallback(() => {
    toast("Content has been copied in clipboard");
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          color: "black",
          position: "relative",
          top: "0",
          display: "flex",
          flexDirection: "column",
          background: "lightgrey",
        }}
      >
        <div> Tokens Per Second: {metrics.tokensPerSecond} </div>
        <div> Total Tokens Used: {metrics.totalTokensUsed} </div>
        <div>
          {" "}
          Estimated Completion Time:{" "}
          {isLoading ? metrics.estimatedCompletionTime : 0} sec{" "}
        </div>
      </div>
      <div
        style={{
          maxWidth: "100vw",
          margin: "0 auto",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          height: "90vh",
        }}
      >
        <div className="chat-container">
          <div className="message-container">
            {messages.map((message) => (
              <MessageContainer
                key={message.id}
                sender={message.role === "user" ? "user" : "AI"}
                timestamp={message.createdAt}
                content={message.content}
                handleToast={handleToast}
              />
            ))}
            {isLoading ? (
              <div className="loading-message">AI is typing...</div>
            ) : null}
            <div ref={bottomRef} />
            {error ? (
              <div style={{ color: "red" }}>
                Something went wrong. Please try again
              </div>
            ) : null}
          </div>
          <form className={"message-form"} onSubmit={handleFormSubmit}>
            <input
              className="message-input"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
            {!isLoading ? (
              <button
                className="send-button"
                type="submit"
                disabled={!input.trim()}
              >
                Send
              </button>
            ) : (
              <button className="send-button" onClick={stop}>
                Stop
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
