import { requireRole } from "@/lib/core/session";
import BookApprovalTable from "./BookApprovalTable";

export default async function Page() {
  await requireRole("admin");

  return <BookApprovalTable />;
}