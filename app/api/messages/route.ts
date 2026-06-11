// GET: Fetch messages between users or for a conversation
// POST: Send a new message

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const otherUserId = searchParams.get('otherUserId')
    const limit = searchParams.get('limit') || '50'

    // TODO: Implement Firestore query using Firebase Admin SDK
    // Query messages where senderId = userId AND receiverId = otherUserId OR vice versa
    // Sort by timestamp descending, limit results
    
    // Mock data
    const mockMessages = [
      {
        messageId: '1',
        senderId: 'user1',
        receiverId: 'user2',
        content: 'Hi, are you interested in the tutoring job?',
        timestamp: '2024-01-28T10:30:00Z',
        read: true,
      },
      {
        messageId: '2',
        senderId: 'user2',
        receiverId: 'user1',
        content: 'Yes, I am! Can you tell me more details?',
        timestamp: '2024-01-28T10:45:00Z',
        read: true,
      },
      {
        messageId: '3',
        senderId: 'user1',
        receiverId: 'user2',
        content: 'Great! The job involves teaching high school algebra...',
        timestamp: '2024-01-28T11:00:00Z',
        read: false,
      },
    ]

    return Response.json(mockMessages, { status: 200 })
  } catch (error: any) {
    console.error('[v0] Get messages error:', error)
    return Response.json(
      { error: error.message || 'Failed to fetch messages' },
      { status: 400 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { senderId, receiverId, content } = body

    // TODO: Validate request body with Zod schema
    // TODO: Verify user is authenticated
    // TODO: Create message in Firestore
    // TODO: Update conversation document with latest message

    return Response.json(
      {
        success: true,
        messageId: 'new-message-id',
        timestamp: new Date().toISOString(),
        message: 'Message sent successfully',
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('[v0] Send message error:', error)
    return Response.json(
      { error: error.message || 'Failed to send message' },
      { status: 400 }
    )
  }
}
