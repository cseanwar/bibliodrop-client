"use server";

import {
  serverFetch,
  serverMutation,
} from "../core/server";

export const getLibrarianDeliveries = async (
  email
) => {
  return serverFetch(
    `/api/deliveries/librarian/${email}`
  );
};

export const updateDeliveryStatus = async (
  id,
  status
) => {
  return serverMutation(
    `/api/deliveries/${id}`,
    { status },
    "PATCH"
  );
};