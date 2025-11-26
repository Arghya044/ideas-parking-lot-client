'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ideasAPI } from '@/lib/api';
import { FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

function AddIdeaForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    price: '',
    category: '',
    priority: 'medium',
    imageUrl: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const categories = [
    'Technology',
    'Business',
    'Creative',
    'Education',
    'Health',
    'Lifestyle',
    'Other',
  ];

  const priorities = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'Full description is required';
    }

    if (formData.price && isNaN(formData.price)) {
      newErrors.price = 'Price must be a number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const ideaData = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : 0,
      };

      const response = await ideasAPI.create(ideaData);

      if (response.success) {
        setSuccess(true);
        // Reset form
        setFormData({
          title: '',
          shortDescription: '',
          fullDescription: '',
          price: '',
          category: '',
          priority: 'medium',
          imageUrl: '',
        });
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push('/manage-ideas');
        }, 2000);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.[0]?.msg ||
        'Failed to create idea. Please try again.';
      setErrors({ submit: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      shortDescription: '',
      fullDescription: '',
      price: '',
      category: '',
      priority: 'medium',
      imageUrl: '',
    });
    setErrors({});
    setSuccess(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Idea</h1>
          <p className="text-gray-600 mb-8">
            Park your creative idea and keep it organized for future reference
          </p>

          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-2">
              <FiCheckCircle className="text-green-600 mt-0.5" />
              <div>
                <p className="text-green-600 font-medium">Idea created successfully!</p>
                <p className="text-green-600 text-sm">Redirecting to Manage Ideas...</p>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <FiAlertCircle className="text-red-600 mt-0.5" />
              <p className="text-red-600 text-sm">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter idea title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Short Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.shortDescription ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Brief description (1-2 lines)"
              />
              {errors.shortDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.shortDescription}</p>
              )}
            </div>

            {/* Full Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="fullDescription"
                value={formData.fullDescription}
                onChange={handleChange}
                rows={6}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.fullDescription ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Detailed description of your idea"
              />
              {errors.fullDescription && (
                <p className="mt-1 text-sm text-red-600">{errors.fullDescription}</p>
              )}
            </div>

            {/* Price and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (USD)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.price ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.category ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Priority and Image URL Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {priorities.map((p) => (
                    <option key={p.value} value={p.value}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating...' : 'Create Idea'}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function AddIdeaPage() {
  return (
    <ProtectedRoute>
      <AddIdeaForm />
    </ProtectedRoute>
  );
}

