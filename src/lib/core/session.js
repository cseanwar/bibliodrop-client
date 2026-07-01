import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user || null;
}

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
};

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null;
}

export const requireRole = async (...roles) => {
  const user = await getUserSession();

  if (!user) {
    redirect("/auth/login");
  }

  if (!roles.includes(user.role)) {
    redirect("/unauthorized");
  }

  return user;
};