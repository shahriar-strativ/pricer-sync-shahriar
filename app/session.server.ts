import { createCookieSessionStorage } from "@remix-run/node";

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [sessionSecret],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

export function getSession(cookieHeader: string | null) {
  return storage.getSession(cookieHeader);
}

export async function commitSession(
  session: Promise<ReturnType<typeof storage.getSession>>,
) {
  const resolvedSession = await session;
  return storage.commitSession(resolvedSession);
}

export async function destroySession(
  session: Promise<ReturnType<typeof storage.getSession>>,
) {
  const resolvedSession = await session;
  return storage.destroySession(resolvedSession);
}
