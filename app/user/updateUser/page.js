"use client";
import { useState, useEffect } from "react";
import { User, Mail, Store, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useGlobal } from "../../providers/GlobalProvider";

export default function UpdateUserProfile() {
  const router = useRouter();
  const { user, userLoading, fetchUser } = useGlobal();
  
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    storeName: user?.storeName || ""
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData({
    name: user?.name || "",
    email: user?.email || "",
    storeName: user?.storeName || ""
  })
  },[user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const {data} = await axios.put(`/api/user/${user._id}`, formData);
      
      if (data.success) {
        toast.success("Profile updated successfully!");
        router.push("/user/profile");
        fetchUser();
      }
    } catch (error) {
      console.error("Update error:", error.message);
      toast.error(error.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur-lg opacity-20"></div>
        
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8">
            <button
              onClick={() => router.push("/user/profile")}
              className="mb-4 flex items-center gap-2 text-white hover:text-indigo-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Profile</span>
            </button>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
                <User className="w-10 h-10 text-indigo-600" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Update Profile
              </h1>
              <p className="text-indigo-100 text-sm">Edit your account information</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                <User className="w-4 h-4 text-indigo-600" />
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`cursor-pointer w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                placeholder="Enter your name"
                autoComplete="off"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-indigo-600" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`cursor-pointer w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                placeholder="Enter your email"
                autoComplete="off"
              />
            </div>

            {/* Store Name Field */}
            <div>
              <label className="cursor-pointer flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Store className="w-4 h-4 text-blue-600" />
                Store Name
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                className={`w-full px-4 py-3 rounded-lg border cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter your store name"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => router.push("/user/profile")}
                className="cursor-pointer flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="cursor-pointer flex-1 group relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Updating...
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2 cursor-pointer">
                    <Save className="w-5 h-5" />
                    Save Changes
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}