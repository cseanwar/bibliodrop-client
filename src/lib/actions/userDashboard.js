import { protectedFetch, serverFetch } from "../core/server";

export const getUserDashboardStats = async (
  email
) => {
  return protectedFetch(
    `/api/dashboard/user/${email}`
  );
};

export const getUserChartData = async (
  email
) => {
  return protectedFetch(
    `/api/dashboard/user/chart/${email}`
  );
};