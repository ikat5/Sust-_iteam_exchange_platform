import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../services/productService';
import ProductBox from '../components/ProductBox';
import { showError } from '../utils/notifications';

const Products = () => {
  const [pageData, setPageData] = useState({ items: [], page: 1, limit: 12, total: 0, totalPages: 0 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const result = await productService.getAllProducts({ page, limit: 12 });
        if (result.success) {
          setPageData(result.data);
        } else {
          setPageData({ items: [], page: 1, limit: 12, total: 0, totalPages: 0 });
          showError(result.message);
        }
      } catch (e) {
        setPageData({ items: [], page: 1, limit: 12, total: 0, totalPages: 0 });
        showError('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">All Products</h1>
          <Link to="/sell" className="text-green-600 hover:text-green-700 font-semibold">Sell Your Item</Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : pageData.total === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Be the first to list a product!</p>
            <Link to="/sell" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700">List Your Product</Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {pageData.items.map((product) => (
                <Link key={product._id} to={`/product/${product._id}`}>
                  <ProductBox product={product} />
                </Link>
              ))}
            </div>

            {pageData.totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                {Array.from({ length: pageData.totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-3 py-1 border rounded ${p === page ? 'bg-green-600 text-white' : ''}`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  disabled={page === pageData.totalPages}
                  onClick={() => setPage((p) => Math.min(pageData.totalPages, p + 1))}
                  className="px-3 py-1 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;



