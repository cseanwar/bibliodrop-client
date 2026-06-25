import {
  protectedFetch,
  protectedMutation,
  serverFetch,
  serverMutation,
} from "../core/server";

/* Book Approval Queue */
export const getPendingBooks = async () => {
  return protectedFetch("/api/books/pending");
};

export const approveBook = async (id) => {
  return protectedMutation(
    `/api/books/approve/${id}`,
    {},
    "PATCH"
  );
};

export const deletePendingBook = async (id) => {
  return protectedMutation(
    `/api/admin/books/${id}`,
    {},
    "DELETE"
  );
};

/* Manage Users */
export const getAllUsers = async () => {
  return protectedFetch("/api/users");
};

export const updateUserRole = async (id,role) => {
  return protectedMutation(`/api/users/role/${id}`, { role }, "PATCH" );
};

export const deleteUser = async (id) => {
  return protectedMutation(
    `/api/users/${id}`,
    {},
    "DELETE"
  );
};

/* Manage All Books */
export const getAllBooks = async () => {
  return protectedFetch("/api/admin/books");
};

export const toggleBookStatusAdmin = async (
  id
) => {
  return protectedMutation(
    `/api/admin/books/status/${id}`,
    {},
    "PATCH"
  );
};

export const deleteBookAdmin = async (id) => {
  return protectedMutation(
    `/api/admin/books/${id}`,
    {},
    "DELETE"
  );
};

export const getAdminStats = async () => {
  return protectedFetch("/api/admin/stats");
};

export const getAllTransactions = async () => {
    return protectedFetch("/api/admin/transactions");
};