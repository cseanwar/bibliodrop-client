import {
  protectedFetch,
  protectedMutation,
  serverFetch,
  serverMutation,
} from "../core/server";

export const getUserReviews = async (email) => {
  return protectedFetch(
    `/api/reviews/user/${email}`
  );
};

export const getReviewsByBook = async ( bookId ) => {
  return serverFetch(
    `/api/reviews/book/${bookId}`
  );
};

export const addReview = async (data) => {
  return protectedMutation(
    "/api/reviews",
    data
  );
};

export const updateReview = async ( id, data ) => {
  return protectedMutation(
    `/api/reviews/${id}`,
    data,
    "PATCH"
  );
};

export const deleteReview = async (id) => {
  return protectedMutation(
    `/api/reviews/${id}`,
    {},
    "DELETE"
  );
};

export const canReviewBook = async ( bookId, email ) => {
  return serverFetch(
    `/api/reviews/can-review/${bookId}/${email}`
  );
};