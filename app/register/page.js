"use client";
import { useState, useEffect } from 'react';
import { Store, Eye, EyeOff, User, Mail, Building2 } from 'lucide-react';
import Link from "next/link";
import { toast } from "sonner";
import {useRouter} from "next/navigation";
import axios from "axios";
import { useGlobal } from ".././providers/GlobalProvider";

export default function StoreRegisterPage() {
 
  const router = useRouter();
  const {user} = useGlobal();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storeName: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
     if(user){
       router.push("/user/products")
     }
  },[user])

  console.log("user", user);

  const resetFormData = () => {
    setFormData({
    name: '',
    email: '',
    storeName: '',
    password: '',
    confirmPassword: ''
  })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(event) => {
      event.preventDefault();

      try{

        if(formData.password !== formData.confirmPassword){
            toast.error("password not matched");
            return;
        }

        const {data} = await axios.post("/api/auth/register",formData);

        if(data.success){
          resetFormData();
          toast.success(data.message);
          router.push("/");
        }else{
          toast.error(data.message);
        }

      }catch(error){
        console.log(err.message);
        toast.error(err.message);
      }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-12">
      <div className="max-w-2xl w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg">
            <Store className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
          <p className="text-gray-600">Start managing your store efficiently today</p>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="fullName"
                  name="name"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                  placeholder="John Doe"
                  autoComplete="off"
                />
              </div>
            </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                    placeholder="you@example.com"
                    autoComplete="off"
                  />
                </div>

            </div>

            {/* Store Name */}
            <div>
              <label htmlFor="storeName" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Store Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  id="storeName"
                  name="storeName"
                  type="text"
                  value={formData.storeName}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                  placeholder="Your Store Name"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Password and Confirm Password in Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 pr-12 outline-none cursor-pointer"
                    placeholder="Create password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 pr-12 outline-none cursor-pointer"
                    placeholder="Confirm password"
                    autoComplete="off"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>


            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 shadow-lg cursor-pointer"
            >
              Create Account
            </button>
          </div>

          {/* Sign In Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            <Link href="/" >Sign in</Link>
          </button>
        </p>
         
        </div>

        
      </div>
    </div>
  );
}