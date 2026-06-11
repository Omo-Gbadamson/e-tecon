'use client'

import { useEffect, useRef } from 'react'

export interface Message {
  messageId: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  read: boolean
}

interface MessagesListProps {
  messages: Message[]
  currentUserId: string
}

export function MessagesList({ messages, currentUserId }: MessagesListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg h-96 overflow-y-auto">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start a conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          const isOwnMessage = message.senderId === currentUserId

          return (
            <div
              key={message.messageId}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  isOwnMessage
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-white text-gray-800 border border-gray-300 rounded-bl-none'
                }`}
              >
                <p className="break-words">{message.content}</p>
                <span
                  className={`text-xs mt-1 block ${
                    isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  )
}
