import React, { useEffect, useState } from "react";
import { cn } from "@/utils/tailwind";
import { AiFillCopy, AiOutlineShareAlt } from "react-icons/ai";

interface MessageProps {
  content: string;
  timestamp: Date;
  sender: "user" | "AI";
  handleToast: () => void;
}

const MessageComponent: React.FC<MessageProps> = ({
  content,
  timestamp,
  sender,
  handleToast,
}) => {
  const isUser = sender === "user";

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      handleToast();
    }
  }, [isCopied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Shared Message",
          text: content,
        });
      } catch (err) {
        console.error("Failed to share: ", err);
      }
    } else {
      console.log("Web Share API not supported");
      // Fallback behavior: copy to clipboard
      handleCopy();
    }
  };

  return (
    <div
      className={cn(
        "flex w-full mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-lg shadow-md p-3",
          isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
        )}
      >
        <div className="flex items-start">
          <div>
            <p
              className={cn("text-sm", isUser ? "text-white" : "text-gray-800")}
            >
              {content}
            </p>
            <p
              className={cn(
                "text-xs mt-1 opacity-70",
                isUser ? "text-white" : "text-gray-600"
              )}
            >
              {timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <div className="control-panel">
          <div onClick={handleCopy} className="control-panel-item">
            <AiFillCopy />
          </div>
          <div onClick={handleShare} className="control-panel-item">
            <AiOutlineShareAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
