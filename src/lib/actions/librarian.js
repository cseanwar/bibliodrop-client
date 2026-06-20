"use server";

import { serverFetch } from "../core/server";

export const getLibrarianStats = async (
  email
) => {
  return serverFetch(
    `/api/librarian/stats/${email}`
  );
};