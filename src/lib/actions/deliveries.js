// "use server";

// import {
//   serverFetch,
//   serverMutation,
// } from "../core/server";

// export const getLibrarianDeliveries = async (
//   email
// ) => {
//   return serverFetch(
//     `/api/deliveries/librarian/${email}`
//   );
// };

// export const updateDeliveryStatus = async (
//   id,
//   status
// ) => {
//   return serverMutation(
//     `/api/deliveries/${id}`,
//     { status },
//     "PATCH"
//   );
// };

"use server";

import {
  serverFetch,
  serverMutation,
} from "../core/server";

export const getLibrarianDeliveries = async (email) => {
  return serverFetch(
    `/api/deliveries/librarian/${email}`
  );
};

export const updateDeliveryStatus = async (id) => {
  return serverMutation(
    `/api/deliveries/status/${id}`,
    {},
    "PATCH"
  );
};

export const getUserDeliveries = async (email) => {
  return serverFetch(
    `/api/deliveries/user/${email}`
  );
};

export const getReadingList = async (email) => {
  return serverFetch(
    `/api/reading-list/${email}`
  );
};