export const getSessionToken = async () => {
  try {
    if (typeof window === "undefined") {
      return null;
    }

    const res = await fetch("/api/session-token");

    if (!res.ok) {
      return null;
    }

    const data = await res.json();

    return data.token;
  } catch {
    return null;
  }
};