import React from 'react'
import Chat from './Chat'
import { ModelProvider } from '@/contexts/ModelContext'

const ChatPage = () => {
  return (
    <ModelProvider>
      <Chat/>
    </ModelProvider>
  )
}

export default ChatPage