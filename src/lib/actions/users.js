"use server";

import {
  serverFetch,
  serverMutation,
} from "../core/server";

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