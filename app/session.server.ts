import { createCookieSessionStorage, redirect } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET || "default_secret_key";
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production", 
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export { getSession, commitSession, destroySession };

export async function requireUserSession(request: Request) {
    console.log('====================================');
    console.log(request, 'ref');
    console.log('====================================');
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");
  if (!userId) {
    throw redirect("/login");
  }
  return userId;
}
