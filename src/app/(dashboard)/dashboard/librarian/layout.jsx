import { requireRole } from "@/lib/core/session";

export default async function LibrarianLayout({
  children,
}) {
  await requireRole("librarian");

  return children;
}