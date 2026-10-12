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

export const getUserProfile = async (email) => {
  return protectedFetch(`/api/user/profile/${email}`);
};

export const updateUserProfile = async (email, data) => {
  return protectedMutation(
    `/api/user/profile/${email}`,
    data,
    "PATCH"
  );
};