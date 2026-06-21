"use server";

import {
  serverFetch,
  serverMutation,
} from "../core/server";

/* Book Approval Queue */
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

export const deletePendingBook = async (id) => {
  return serverMutation(
    `/api/admin/books/${id}`,
    {},
    "DELETE"
  );
};

/* Manage Users */
export const getAllUsers = async () => {
  return serverFetch("/api/users");
};

export const updateUserRole = async (
  id,
  role
) => {
  return serverMutation(
    `/api/users/role/${id}`,
    { role },
    "PATCH"
  );
};

export const deleteUser = async (id) => {
  return serverMutation(
    `/api/users/${id}`,
    {},
    "DELETE"
  );
};

/* Manage All Books */
export const getAllBooks = async () => {
  return serverFetch("/api/admin/books");
};

export const toggleBookStatusAdmin = async (
  id
) => {
  return serverMutation(
    `/api/admin/books/status/${id}`,
    {},
    "PATCH"
  );
};

export const deleteBookAdmin = async (id) => {
  return serverMutation(
    `/api/admin/books/${id}`,
    {},
    "DELETE"
  );
};

export const getAdminStats = async () => {
  return serverFetch("/api/admin/stats");
};

export const getAllTransactions = async () => {
    return serverFetch("/api/admin/transactions");
  };