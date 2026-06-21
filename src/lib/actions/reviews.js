"use server";

import {
  serverFetch,
  serverMutation,
} from "../core/server";

export const getUserReviews = async (email) => {
  return serverFetch(
    `/api/reviews/user/${email}`
  );
};

export const addReview = async (data) => {
  return serverMutation(
    "/api/reviews",
    data
  );
};

export const updateReview = async (
  id,
  data
) => {
  return serverMutation(
    `/api/reviews/${id}`,
    data,
    "PATCH"
  );
};

export const deleteReview = async (id) => {
  return serverMutation(
    `/api/reviews/${id}`,
    {},
    "DELETE"
  );
};