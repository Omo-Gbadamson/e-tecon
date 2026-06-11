// Signup is handled client-side with Firebase Auth
// This endpoint is kept for reference but authentication happens in the browser

export async function POST(request: Request) {
  return Response.json(
    { error: 'Use Firebase Auth directly for signup' },
    { status: 400 }
  )
}
