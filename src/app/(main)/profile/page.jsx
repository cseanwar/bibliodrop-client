"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { getUserProfile, updateUserProfile } from "@/lib/actions/users";
import { imageUploadInImgBB } from "@/utilities/imageUploadInImgBB";
import toast from "react-hot-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaSave,
  FaThLarge,
  FaCamera,
  FaShieldAlt,
} from "react-icons/fa";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "reader",
    image: "",
    phone: "",
    address: "",
    bio: "",
  });

  useEffect(() => {
    if (!sessionLoading && !session) {
      router.push("/login");
      return;
    }

    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session, sessionLoading]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await getUserProfile(session.user.email);
      if (data) {
        setProfile({
          name: data.name || session.user.name || "",
          email: data.email || session.user.email || "",
          role: data.role || session.user.role || "reader",
          image: data.image || session.user.image || "",
          phone: data.phone || "",
          address: data.address || "",
          bio: data.bio || "",
        });
      }
    } catch (error) {
      console.error("Failed to load profile:", error);
      // Fallback to session details if server profile endpoint is empty
      setProfile((prev) => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
        role: session.user.role || "reader",
        image: session.user.image || "",
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingImage(true);
      const url = await imageUploadInImgBB(file);
      if (url) {
        setProfile((prev) => ({ ...prev, image: url }));
        toast.success("Avatar uploaded. Click Save to apply.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload avatar");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await updateUserProfile(session.user.email, {
        name: profile.name,
        image: profile.image,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio,
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const getDashboardPath = (role) => {
    if (role === "librarian") return "/dashboard/librarian";
    if (role === "admin") return "/dashboard/admin";
    return "/dashboard/user";
  };

  if (sessionLoading || loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const roleName =
    profile.role === "librarian"
      ? "Librarian"
      : profile.role === "admin"
        ? "Administrator"
        : "Reader";

  const roleBadgeColor =
    profile.role === "librarian"
      ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300 dark:border-amber-700"
      : profile.role === "admin"
        ? "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300 dark:border-purple-700"
        : "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300 dark:border-blue-700";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8 mb-8">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with upload overlay */}
          <div className="relative group shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 flex items-center justify-center relative shadow-md">
              {profile.image ? (
                <Image
                  src={profile.image}
                  alt={profile.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <FaUser className="text-4xl text-slate-400" />
              )}

              {uploadingImage && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            <label
              htmlFor="avatar-upload"
              className="absolute -bottom-2 -right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow cursor-pointer transition flex items-center justify-center text-xs"
              title="Change Profile Photo"
            >
              <FaCamera />
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={uploadingImage}
                className="hidden"
              />
            </label>
          </div>

          {/* User Meta */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {profile.name || "BiblioDrop User"}
              </h1>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${roleBadgeColor}`}
              >
                {roleName}
              </span>
            </div>

            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center sm:justify-start gap-2">
              <FaEnvelope className="text-xs" />
              {profile.email}
            </p>

            {profile.bio && (
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 max-w-xl">
                {profile.bio}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <Link
                href={getDashboardPath(profile.role)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition shadow-sm"
              >
                <FaThLarge className="text-xs" />
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Profile & Delivery Details
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Update your contact and delivery information for book requests.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  required
                  placeholder="Your full name"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Email (Read Only) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Email Address (Account ID)
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="email"
                  value={profile.email}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Phone Number
              </label>
              <div className="relative">
                <FaPhone className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile({ ...profile, phone: e.target.value })
                  }
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Role (Read only) */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Account Role
              </label>
              <div className="relative">
                <FaShieldAlt className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
                <input
                  type="text"
                  value={roleName}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/50 text-slate-500 text-sm cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Default Delivery Address
            </label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3.5 top-3.5 text-slate-400 text-sm" />
              <input
                type="text"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
                placeholder="Street address, apartment/suite, city, postal code"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Used by librarians to coordinate book dispatch.
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Bio & Reading Interests
            </label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) =>
                setProfile({ ...profile, bio: e.target.value })
              }
              placeholder="Tell other readers and librarians about your favorite genres or reading goals..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-medium text-sm transition shadow-sm cursor-pointer"
            >
              <FaSave />
              {saving ? "Saving..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
