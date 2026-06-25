import { getSessionToken } from "./client-token";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Add authorization headers if user is logged in
 */
// export const authHeader = async () => {
//   return {};
// }

// export const authHeader = async () => {
//   const token = await getUserToken();
//   const header = token ? {
//     authorization : `Bearer ${token}`
//   } : {};
//   return header;
// }

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
    // method: "GET",
    // headers: {
    //   ...(await authHeader()),
    // },
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

// export const serverMutation = async (
//   path,
//   data = {},
//   method = "POST"
// ) => {
//   const url = `${baseUrl}${path}`;

//   console.log("REQUEST URL:", url);

//   const res = await fetch(url, {
//     method,
//     headers: {
//       "Content-Type": "application/json",
//       ...(await authHeader()),
//     },
//     body: JSON.stringify(data),
//   });

//   const text = await res.text();

//   console.log("RESPONSE TEXT:", text);

//   try {
//     return JSON.parse(text);
//   } catch {
//     throw new Error("Backend returned HTML instead of JSON");
//   }
// };