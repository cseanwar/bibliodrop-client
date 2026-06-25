import { protectedFetch, serverFetch, serverMutation } from "../core/server";

export const getWishlist = async (email) => {
  return serverFetch(`/api/wishlist/${email}`);
};

export const addToWishlist = async ( bookId, userEmail ) => {
  return protectedFetch( "/api/wishlist", { bookId, userEmail }, "POST" )
};

export const removeFromWishlist = async (
  bookId,
  userEmail
) => {
  return protectedFetch(
    "/api/wishlist",
    {
      bookId,
      userEmail,
    },
    "DELETE"
  );
};
