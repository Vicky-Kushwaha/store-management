"use client";
import { useState } from "react";
import {
  Store,
  Package,
  Plus,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useGlobal } from "@/app/providers/GlobalProvider";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const { user, setUser } = useGlobal();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Products", icon: Package, path: "/user/products" },
    { name: "Add Product", icon: Plus, path: "/user/addProduct" },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/auth/logout");
      if (data.success) {
        toast.success(data.message);
        setUser("");
        router.push("/");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const isActive = (path) => pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
          >
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-gray-900 hidden sm:block">
              Store Manager
            </span>
          </div>

          {/* Desktop Navigation (Right aligned) */}
          <div className="hidden md:flex items-center space-x-1 ml-auto">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className={`cursor-pointer flex items-center px-4 py-2 rounded-lg text-sm font-medium transition ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4 ml-4">
            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="cursor-pointer flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <span className="hidden lg:block text-sm font-medium text-gray-700 capitalize">
                  {user?.name}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border">
                  <button
                    onClick={() => handleNavigation("/user/profile")}
                    className="cursor-pointer w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    My Profile
                  </button>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="cursor-pointer md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <button
                  key={link.name}
                  onClick={() => handleNavigation(link.path)}
                  className={`cursor-pointer w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium ${
                    active
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {link.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
