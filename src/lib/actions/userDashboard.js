import { serverFetch } from "../core/server";

export const getUserDashboardStats = async (
  email
) => {
  return serverFetch(
    `/api/dashboard/user/${email}`
  );
};

export const getUserChartData = async (
  email
) => {
  return serverFetch(
    `/api/dashboard/user/chart/${email}`
  );
};