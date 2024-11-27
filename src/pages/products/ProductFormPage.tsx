import React from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDropzone } from 'react-dropzone';
import { Product } from '../../types';

const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().min(0, 'Price must be positive'),
  stockQuantity: z.number().min(0, 'Stock quantity must be positive'),
  status: z.enum(['active', 'inactive']),
  careInstructions: z.object({
    light: z.string(),
    water: z.string(),
    temperature: z.string(),
    humidity: z.string(),
    soil: z.string(),
    fertilizer: z.string(),
    additionalNotes: z.string().optional(),
  }),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function ProductFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    onDrop: (acceptedFiles) => {
      // Handle file upload
    },
  });

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) return null;
      // Implement API call to fetch product
      return null;
    },
    enabled: isEditing,
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      // Implement API call to create/update product
    },
    onSuccess: () => {
      navigate('/products');
    },
  });

  const onSubmit = (data: ProductFormData) => {
    mutation.mutate(data);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">
        {isEditing ? 'Edit Product' : 'Add New Product'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Basic Information
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Product details and specifications.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Product Name
                  </label>
                  <input
                    type="text"
                    {...register('name')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    type="text"
                    {...register('sku')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {errors.sku && (
                    <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
                  )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                {/* Add more fields for price, stock, etc. */}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Images
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload product images.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <div
                {...getRootProps()}
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md"
              >
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <input {...getInputProps()} />
                    <p className="pl-1">Drag and drop images or click to select files</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isEditing ? 'Update' : 'Create'} Product
          </button>
        </div>
      </form>
    </div>
  );
}