import { requireRole } from "@/lib/core/session";

export default async function UserLayout({ children }) {
  await requireRole("user", "reader");

  return children;
}