import { protectedFetch } from "../core/server";

export const getLibrarianStats = async (email) => {
  return protectedFetch(`/api/librarian/stats/${email}`);
};