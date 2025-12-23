"use client";
import { useEffect, useState } from "react";
import { User, Mail, Store, Calendar, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import {useGlobal} from "../../providers/GlobalProvider";

export default function UserProfile() {
  const router = useRouter();
  const {user, userLoading} = useGlobal();
  
  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        {/* Subtle shadow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl blur-lg opacity-20"></div>
        
        {/* Main card */}
        <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg">
              <User className="w-10 h-10 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {user.name}
            </h1>
            <p className="text-indigo-100 text-sm">Profile Overview</p>
          </div>

          {/* Content */}
          <div className="p-8 space-y-6">
            {/* Email Card */}
            <div className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="text-gray-900 font-medium truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Store Name Card */}
            <div className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:shadow-blue-100">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Store className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Store Name</p>
                  <p className="text-gray-900 font-medium truncate">{user.storeName}</p>
                </div>
              </div>
            </div>

            {/* Created At Card */}
            <div className="group bg-gray-50 rounded-xl p-5 border border-gray-200 hover:border-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-500 mb-1">Member Since</p>
                  <p className="text-gray-900 font-medium">
                    {new Date(user.createdAt).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => router.push("/user/updateUser")}
              className="mt-4 w-full group relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-200 hover:scale-105"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 cursor-pointer">
                <Edit className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Edit Profile
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}