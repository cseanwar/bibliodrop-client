import { auth } from "@/lib/auth";

export async function GET(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return Response.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  return Response.json({
    token: session.session.token,
  });
}