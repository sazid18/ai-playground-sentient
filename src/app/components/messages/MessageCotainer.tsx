import React from 'react'
import { cn } from "@/utils/tailwind";

interface MessageProps {
  content: string
  timestamp: Date
  sender: 'user' | 'AI'
  avatar?: string
}

const MessageContainer: React.FC<MessageProps> = ({ content, timestamp, sender, avatar }) => {
  const isUser = sender === 'user'

  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[70%] rounded-lg shadow-md p-3",
        isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"
      )}>
        <div className="flex items-start">
          {!isUser && (
            <div className="h-8 w-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
              <img src={avatar || "/placeholder.svg?height=32&width=32"} alt="System Avatar" className="h-full w-full object-cover" />
            </div>
          )}
          <div>
            <p className={cn(
              "text-sm",
              isUser ? "text-white" : "text-gray-800"
            )}>
              {content}
            </p>
            <p className={cn(
              "text-xs mt-1 opacity-70",
              isUser ? "text-white" : "text-gray-600"
            )}>
              {timestamp.toLocaleTimeString()}
            </p>
          </div>
          {isUser && (
            <div className="h-8 w-8 rounded-full overflow-hidden ml-2 flex-shrink-0">
              <img src={avatar || "/placeholder.svg?height=32&width=32"} alt="User Avatar" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MessageContainer

