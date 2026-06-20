"use server";

import { serverFetch, serverMutation } from "../core/server";

// export const toggleBookStatus = async (id) => {
//   return serverMutation(
//     `/api/books/toggle-status/${id}`,
//     {},
//     "PATCH"
//   );
// };

export const getPendingBooks = async () => {
  return serverFetch("/api/books/pending");
};

export const approveBook = async (id) => {
  return serverMutation(
    `/api/books/approve/${id}`,
    {},
    "PATCH"
  );
};

export const deleteBook = async (id) => {
  return serverMutation(
    `/api/admin/books/${id}`,
    {},
    "DELETE"
  );
};