"use client";
import { useState, useEffect } from "react";
import { Search, AlertCircle } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProductsList() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [filterCount, setFilterCount] = useState(0);
  const [itemPerPage, setItemPerPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  /* ------------------ ACTIONS ------------------ */

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      if (data.success) {
        toast.success(data.message);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleEdit = (id) => {
    router.push(`/user/updateProduct/${id}`);
  };

  /* ------------------ FETCH PRODUCTS ------------------ */

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `/api/products?keyword=${searchQuery}&page=${page}`
      );

      if (data.success) {
        setProducts((prev) =>
          page === 1 ? data.products : [...prev, ...data.products]
        );

        setFilterCount(data.filterProductCounts);
        setItemPerPage(data.resultPerPage);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ EFFECTS ------------------ */

  // Fetch when page or search changes
  useEffect(() => {
    fetchProducts();
  }, [page, searchQuery]);

  // Calculate total pages
  useEffect(() => {
    if (itemPerPage > 0) {
      setTotalPage(Math.ceil(filterCount / itemPerPage));
    }
  }, [filterCount, itemPerPage]);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.scrollHeight - 5 &&
        !loading &&
        page < totalPage
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, page, totalPage]);

  /* ------------------ SEARCH RESET ------------------ */

  const clearSearch = () => {
    setSearchQuery("");
    setProducts([]);
    setPage(1);
  };

  const getStockStatus = (stock) => {
    if (stock < 20)
      return { text: "Low Stock", color: "text-red-600 bg-red-50" };
    if (stock < 50)
      return { text: "Medium", color: "text-yellow-600 bg-yellow-50" };
    return { text: "In Stock", color: "text-green-600 bg-green-50" };
  };

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              value={searchQuery}
              onChange={(e) => {
                setProducts([]);
                setPage(1);
                setSearchQuery(e.target.value);
              }}
              placeholder="Search by product name..."
              className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
               <ProductCard
                key={product._id}
                product={product}
                stockStatus={getStockStatus(product.stock)}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          !loading && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                No products found
              </h3>
            </div>
          )
        )}

        {/* Loader */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-2">Loading products...</p>
          </div>
        )}
      </div>
    </div>
  );
}
