import { getSessionToken } from "./client-token";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Handle API response
 */
export const handleStatusCode = async (res) => {
  const contentType = res.headers.get("content-type");

  if (!contentType?.includes("application/json")) {
    const text = await res.text();

    console.error("Invalid Response:", text);

    throw new Error("Invalid API response");
  }

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Something went wrong");
  }

  return data;
};

/**
 * GET requests
 */
export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`, {
    cache: "no-store",
  });

  return handleStatusCode(res);
};

/**
 * POST / PATCH / PUT / DELETE requests
 */
export const serverMutation = async (
  path,
  data = {},
  method = "POST"
) => {
  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      // ...(await authHeader()),
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};

export const protectedFetch = async (
  path,
  method = "GET",
  body = null
) => {
  const token = await getSessionToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${path}`,
    {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      ...(body && {
        body: JSON.stringify(body),
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data?.message || "Request failed"
    );
  }

  return data;
};

export const protectedMutation = async (
  path,
  data = {},
  method = "POST"
) => {
  const token = await getSessionToken();

  console.log("TOKEN:", token);

  const res = await fetch(`${baseUrl}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleStatusCode(res);
};