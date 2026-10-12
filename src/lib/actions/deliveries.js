import {
  protectedFetch,
  protectedMutation,
  serverFetch,
} from "../core/server";

export const getLibrarianDeliveries = async (email) => {
  return protectedFetch(
    `/api/deliveries/librarian/${email}`
  );
};

export const createDeliveryRequest = async (requestData) => {
  return protectedMutation(
    `/api/delivery-request`,
    requestData
  );
};

export const updateDeliveryStatus = async (id, status) => {
    return protectedMutation(
      `/api/deliveries/${id}`,
      { status },
      "PATCH"
    );
  };

export const getUserDeliveries = async (email) => {
  return protectedFetch(
    `/api/deliveries/user/${email}`
  );
};

export const getReadingList = async (email) => {
  return protectedFetch(
    `/api/reading-list/${email}`
  );
};