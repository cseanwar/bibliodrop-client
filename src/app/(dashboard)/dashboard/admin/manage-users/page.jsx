"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { getAllUsers, updateUserRole, deleteUser } from "@/lib/actions/users";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load users");
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      toast.success(`Role updated to ${role}`);
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      toast.success("User deleted");
      fetchUsers();
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return <div className="py-10 text-center text-slate-400">Loading users...</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-slate-500 mt-2">Manage user roles and accounts.</p>
        </div>
        <div className="bg-slate-800/50 border border-slate-700/50 px-4 py-2 rounded-xl text-sm font-medium text-slate-300">
          Total Users: <span className="text-white font-bold">{users.length}</span>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl p-10 text-center border">
          <h2 className="text-xl font-semibold">No Users Found</h2>
        </div>
      ) : (
        <div className="overflow-x-auto dark:bg-slate-900 rounded-2xl border">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900 text-slate-400 text-xs uppercase tracking-wider font-semibold">
                <th className="w-[25%] px-6 py-4 text-left">Name</th>
                <th className="w-[30%] px-6 py-4 text-left">Email</th>
                <th className="w-[15%] px-6 py-4 text-left">Role</th>
                <th className="w-[30%] px-6 py-4 text-right pr-8">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60">
              {users.map((user) => (
                <tr 
                  key={user._id} 
                  className="hover:bg-slate-800/30 transition-colors align-middle"
                >
                  {/* Name */}
                  <td className="px-6 py-4 text-slate-400 truncate">
                    {user.name}
                  </td>

                  {/* Email */}
                  <td className="px-6 py-4 text-slate-400 truncate">
                    {user.email}
                  </td>

                  {/* Role Badge */}
                  <td className="px-6 py-4">
                    <span
                      className={`
                        inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide uppercase
                        ${
                          user.role === "admin"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : user.role === "librarian"
                              ? "bg-sky-500/10 text-sky-400 border border-sky-500/20"
                              : "bg-slate-500/10 text-slate-400 border border-slate-500/20"
                        }
                      `}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right pr-8">
                    <div className="flex justify-end items-center gap-2">
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs px-3 py-1.5 rounded-lg transition-all"
                        >
                          Make Admin
                        </button>
                      )}

                      {user.role !== "librarian" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "librarian")}
                          className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white border border-blue-500/30 font-medium text-xs px-3 py-1.5 rounded-lg transition-all"
                        >
                          Make Librarian
                        </button>
                      )}

                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="bg-rose-950/40 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-900/50 font-medium text-xs px-3 py-1.5 rounded-lg transition-all"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}