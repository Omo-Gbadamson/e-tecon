// Logout is handled client-side with Firebase Auth
// This endpoint is kept for reference but sign-out happens in the browser

export async function POST(request: Request) {
  return Response.json(
    { success: true, message: 'Use auth.signOut() on client' },
    { status: 200 }
  )
}
