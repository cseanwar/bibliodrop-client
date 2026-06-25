import { serverMutation } from "../core/server";

export const createCheckoutSession = async (payload) => {
    return serverMutation(
      "/api/create-checkout-session",
      payload
    );
  };