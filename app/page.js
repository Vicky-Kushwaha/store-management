"use client";
import { useState, useEffect } from 'react';
import { Store, Eye, EyeOff } from 'lucide-react';
import Link from "next/link";
import axios from "axios";
import {useRouter} from "next/navigation";
import { toast } from "sonner"
import {useGlobal} from "./providers/GlobalProvider";

export default function StoreLoginPage() {
  
  const router = useRouter();
  const {user, fetchUser} = useGlobal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if(user){
       router.push("/user/products");
    }
  },[user])

  const resetFormData = () => {
    setEmail("");
    setPassword("");
  }

  const handleSubmit = async(event) => {
     event.preventDefault();

     try{

       const {data} = await axios.post("http://localhost:3000/api/auth/login",{email, password});
       console.log("data ",data)
       if(data.success){
           fetchUser();
           resetFormData();
           toast.success(data.message);
           router.push("/user/products");
       }else{
           toast.error(data.message);
       }

     }catch(err){
       console.log(err.message);
       toast.error(err.message);
     }
  };

  return (
    <>
       <div className="flex justify-center items-center flex-col mt-3" >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl shadow-lg">
            <Store className="w-7 h-7 text-white" />
         </div>         
         <h1 className="text-3xl font-bold text-gray-900 mb-2">Store Manager</h1>
          <p className="text-gray-600 mb-4">Making business management effortless</p>
       </div>

<div className="p-4">
      <div className="w-full flex justify-center items-center gap-8">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          {/* Features Description */}
          <div className="rounded-xl w-120 p-6 mb-6 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Why Store Manager?</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span><strong>Track Product Locations:</strong> Know exactly which rack holds each product with precise location tracking</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span><strong>Identify Top Sellers:</strong> Monitor best-selling products and optimize your inventory strategy</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span><strong>Low Stock Alerts:</strong> Get notified when products are running low and need restocking</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-1.5 h-1.5 bg-indigo-600 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                <span><strong>Streamline Operations:</strong> Simplify your business management and save valuable time</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-white w-100 rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                placeholder="you@example.com"
                autoComplete="off"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 pr-12 outline-none cursor-pointer"
                  placeholder="Enter your password"
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

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 shadow-lg cursor-pointer"
            >
              Sign In
            </button>
          </div>
      
         {/* Sign Up Link */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            <Link href="/register" >Sign up for free</Link>
          </button>
        </p>
        </div>
      </div>
    </div>
    </>
  );
}