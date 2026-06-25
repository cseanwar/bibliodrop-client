export const getSessionToken = async () => {
  try {
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