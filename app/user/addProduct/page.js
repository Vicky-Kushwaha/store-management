"use client";
import { useState } from 'react';
import { Store, Upload, X, IndianRupee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from "sonner";
import axios from "axios";

export default function AddProduct() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    rack: '',
    stock: ''
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const categories = [
    'Electronics',
    'Clothing',
    'Food & Beverages',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Stationery',
    'Health & Beauty',
    'Toys & Games',
    'Other'
  ];

  const resetFormData = () => {
     setFormData({
         name: '',
         price: '',
         description: '',
         category: '',
         rack: '',
         stock: ''
     })

     removeImage();
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
  };

  const handleSubmit = async(event) => {
    
    event.preventDefault();

    try{

      const fieldData = new FormData();

      for(let key in formData){
        fieldData.append(key, formData[key]);
      }

      fieldData.append("image",imageFile);

      const {data} = await axios.post("/api/products",fieldData);

      if(data.success){
        toast.success(data.message);
        resetFormData();
      }else{
        toast.error(data.message);
      }

    }catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 py-12">
      <div className="max-w-3xl w-full">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
          <p className="text-gray-600">Add products to your inventory</p>
        </div>

        {/* Add Product Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                placeholder="Enter product name"
                autoComplete="off"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Product Image <span className="text-red-500">*</span>
              </label>
              
              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition duration-200">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label htmlFor="image" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-1">Click to upload product image</p>
                    <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  </label>
                </div>
              ) : (
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-48 h-48 object-cover rounded-lg border-2 border-gray-300"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition duration-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Price and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                    <IndianRupee className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                    placeholder="0.00"
                    step="0.01"
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 resize-none outline-none cursor-pointer"
                placeholder="Enter product description..."
              />
            </div>

            {/* Rack Number and Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rack Number */}
              <div>
                <label htmlFor="rack" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Rack Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="rack"
                  name="rack"
                  value={formData.rack}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                  placeholder="e.g., A-12, B-05"
                  autoComplete="off"
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-2 cursor-pointer">
                  Stock Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200 outline-none cursor-pointer"
                  placeholder="0"
                  min="0"
                  autoComplete="off"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 shadow-lg cursor-pointer"
              >
                Add Product
              </button>
            </div>
          </div>
        </div>

        {/* Back to Dashboard Link */}
        <p className="mt-6 text-center text-sm text-gray-600" onClick={() => router.back()} >
          <button className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
            ← Go Back
          </button>
        </p>
      </div>
    </div>
  );
}