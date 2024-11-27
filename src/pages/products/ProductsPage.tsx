import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../../types';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      // Implement API call to fetch products
      return [];
    },
  });

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
        <Link
          to="/products/new"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Product
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {products?.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                className="block hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {product.images[0] && (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className="h-10 w-10 rounded-full mr-4"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-indigo-600 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.status}
                      </span>
                      <p className="ml-4 text-sm text-gray-500">
                        Stock: {product.stockQuantity}
                      </p>
                      <p className="ml-4 text-sm font-medium text-gray-900">
                        ${product.price}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}