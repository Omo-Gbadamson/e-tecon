// This route is a passthrough - login is handled client-side with Firebase Auth
// The actual authentication happens in the browser and the token is managed by Firebase

export async function POST(request: Request) {
  // This endpoint is not used for login - Firebase Auth handles client-side authentication
  return Response.json(
    { error: 'Use Firebase Auth directly for login' },
    { status: 400 }
  )
}
