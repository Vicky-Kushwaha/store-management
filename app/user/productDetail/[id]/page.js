"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { IndianRupee, Package, Tag, Grid, ArrowLeft, Box } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export default function ProductDetail() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`/api/products/${params.id}`);
      if (response.data.success) {
        setProduct(response.data.product);
      }
    } catch (error) {
      console.error("Error fetching product:", error.message);
      toast.error("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const getStockStatus = () => {
    if (!product) return { text: "", color: "" };
    
    if (product.stock === 0) {
      return { text: "Out of Stock", color: "bg-red-500 text-white" };
    } else if (product.stock < 10) {
      return { text: "Low Stock", color: "bg-yellow-500 text-white" };
    } else {
      return { text: "In Stock", color: "bg-green-500 text-white" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-xl mb-6">Product not found</p>
          <button
            onClick={() => router.push("/products")}
            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="cursor-pointer mb-8 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
          <span className="font-semibold">Back</span>
        </button>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image Section */}
          <div className="relative group">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400 via-blue-400 to-purple-400 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={product.image.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Stock Badge */}
                <div className="absolute top-6 right-6">
                  <div className={`${stockStatus.color} px-5 py-2.5 rounded-full text-sm font-bold shadow-xl backdrop-blur-sm`}>
                    {stockStatus.text}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Product Information */}
          <div className="space-y-8">
            {/* Product Name & Description */}
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>
              
              {product.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Price Section */}
            <div className="py-8 border-y border-gray-200">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl shadow-lg">
                  <IndianRupee className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Price</p>
                  <p className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                    ₹{product.price}
                  </p>
                </div>
              </div>
            </div>

            {/* Product Details Grid */}
            <div className="grid grid-cols-1 gap-6">
              {/* Category */}
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Tag className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Category</p>
                  <p className="text-2xl font-bold text-gray-900">{product.category}</p>
                </div>
              </div>

              {/* Rack Location */}
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Grid className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Rack Location</p>
                  <p className="text-2xl font-bold text-gray-900">{product.rack}</p>
                </div>
              </div>

              {/* Stock Quantity */}
              <div className="flex items-center gap-4 group">
                <div className="p-4 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Box className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 font-medium mb-1">Available Stock</p>
                  <p className="text-2xl font-bold text-gray-900">{product.stock} <span className="text-lg text-gray-500 font-medium">units</span></p>
                </div>
              </div>
            </div>

            {/* Footer Info */}
            {product.createdAt && (
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center gap-2 text-gray-500">
                  <Package className="w-4 h-4" />
                  <p className="text-sm font-medium">
                    Added on {new Date(product.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}