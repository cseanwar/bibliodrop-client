import { protectedMutation, serverMutation } from "../core/server";

export const createCheckoutSession = async (payload) => {
    return protectedMutation(
      "/api/create-checkout-session",
      payload
    );
  };