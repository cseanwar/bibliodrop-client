import {
  protectedFetch,
  protectedMutation,
} from "../core/server";

export const getAllUsers = async () => {
  return protectedFetch("/api/users");
};

export const updateUserRole = async (
  id,
  role
) => {
  return protectedMutation(
    `/api/users/role/${id}`,
    { role },
    "PATCH"
  );
};

export const deleteUser = async (id) => {
  return protectedMutation(
    `/api/users/${id}`,
    {},
    "DELETE"
  );
};