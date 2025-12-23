"use client";
import { IndianRupee, Edit, Trash2, Eye } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductCard({
  product,
  stockStatus,
  handleDelete,
  handleEdit,
}) {
  const router = useRouter();
  
  const handleViewDetails = () => {
    router.push(`/user/productDetail/${product._id}`);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
        {/* Product Image */}
        <div className="relative h-48 bg-gray-200">
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${stockStatus.color}`}
          >
            {stockStatus.text}
          </div>
        </div>
        
        {/* Product Details */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.name}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Category:</span>
              <span className="font-medium text-gray-900">
                {product.category}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Rack:</span>
              <span className="font-medium text-indigo-600">
                {product.rack}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Stock:</span>
              <span className="font-medium text-gray-900">
                {product.stock} units
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex items-center text-2xl font-bold text-indigo-600">
              <IndianRupee className="w-5 h-5" />
              {product.price}
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(product._id);
                }}
                className="cursor-pointer p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition duration-200"
                title="Edit Product"
              >
                <Edit className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(product._id);
                }}
                className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-200"
                title="Delete Product"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* View Details Button */}
          <button
            onClick={handleViewDetails}
            className="cursor-pointer mt-4 w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-3 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            View Details
          </button>
        </div>
      </div>
    </>
  );
}