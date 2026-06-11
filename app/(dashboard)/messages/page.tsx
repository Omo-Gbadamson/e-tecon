'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessagesList } from '@/components/chat/messages-list'
import { MessageForm } from '@/components/forms/message-form'
import { MessageCircle } from 'lucide-react'

// Mock conversations
const mockConversations = [
  {
    userId: 'user2',
    userName: 'John Doe',
    lastMessage: 'Great! The job involves teaching...',
    timestamp: '2024-01-28T11:00:00Z',
    unread: true,
  },
  {
    userId: 'user3',
    userName: 'Jane Smith',
    lastMessage: 'Thank you for the course recommendation',
    timestamp: '2024-01-27T15:30:00Z',
    unread: false,
  },
]

// Mock messages
const mockMessages = [
  {
    messageId: '1',
    senderId: 'current-user',
    receiverId: 'user2',
    content: 'Hi, are you interested in the tutoring job?',
    timestamp: '2024-01-28T10:30:00Z',
    read: true,
  },
  {
    messageId: '2',
    senderId: 'user2',
    receiverId: 'current-user',
    content: 'Yes, I am! Can you tell me more details?',
    timestamp: '2024-01-28T10:45:00Z',
    read: true,
  },
  {
    messageId: '3',
    senderId: 'current-user',
    receiverId: 'user2',
    content: 'Great! The job involves teaching high school algebra...',
    timestamp: '2024-01-28T11:00:00Z',
    read: false,
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(
    null
  )
  const [messages, setMessages] = useState(mockMessages)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (content: string) => {
    try {
      setIsLoading(true)

      const newMessage = {
        messageId: `msg-${Date.now()}`,
        senderId: 'current-user',
        receiverId: selectedConversation || 'user2',
        content,
        timestamp: new Date().toISOString(),
        read: false,
      }

      setMessages([...messages, newMessage])

      // TODO: Call API to save message to Firestore
      // await fetch('/api/messages', {
      //   method: 'POST',
      //   body: JSON.stringify(newMessage),
      // })
    } catch (error) {
      console.error('[v0] Error sending message:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <MessageCircle className="w-8 h-8" />
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations list */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockConversations.map((conversation) => (
                    <button
                      key={conversation.userId}
                      onClick={() => setSelectedConversation(conversation.userId)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        selectedConversation === conversation.userId
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-semibold text-sm">
                            {conversation.userName}
                          </p>
                          <p className="text-xs truncate text-gray-600">
                            {conversation.lastMessage}
                          </p>
                        </div>
                        {conversation.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat area */}
          <div className="md:col-span-2">
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle>
                    {
                      mockConversations.find(
                        (c) => c.userId === selectedConversation
                      )?.userName
                    }
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col gap-4">
                  <MessagesList
                    messages={messages.filter(
                      (m) =>
                        (m.senderId === 'current-user' &&
                          m.receiverId === selectedConversation) ||
                        (m.senderId === selectedConversation &&
                          m.receiverId === 'current-user')
                    )}
                    currentUserId="current-user"
                  />
                  <MessageForm onSend={handleSendMessage} disabled={isLoading} />
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">
                      Select a conversation to start messaging
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
