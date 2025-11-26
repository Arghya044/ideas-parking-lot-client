'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ideasAPI } from '@/lib/api';
import { FiEye, FiTrash2, FiEdit, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

function ManageIdeasContent() {
  const router = useRouter();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await ideasAPI.getMyIdeas();
      if (response.success) {
        setIdeas(response.ideas || []);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      const response = await ideasAPI.delete(id);
      if (response.success) {
        setMessage('Idea deleted successfully!');
        setIdeas(ideas.filter((idea) => idea.id !== id));
        setShowConfirm(null);
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Failed to delete idea. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Manage Ideas</h1>
            <p className="text-lg text-gray-600">
              View, edit, and delete your saved ideas
            </p>
          </div>
          <Link
            href="/add-idea"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Add New Idea
          </Link>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 p-4 rounded-lg flex items-start space-x-2 ${
              message.includes('success')
                ? 'bg-green-50 border border-green-200'
                : 'bg-red-50 border border-red-200'
            }`}
          >
            {message.includes('success') ? (
              <FiCheckCircle className="text-green-600 mt-0.5" />
            ) : (
              <FiAlertCircle className="text-red-600 mt-0.5" />
            )}
            <p
              className={
                message.includes('success') ? 'text-green-600' : 'text-red-600'
              }
            >
              {message}
            </p>
          </div>
        )}

        {/* Ideas Table/Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : ideas.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No ideas yet</h3>
            <p className="text-gray-600 mb-6">
              Start parking your ideas to see them here
            </p>
            <Link
              href="/add-idea"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Add Your First Idea
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Title
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Description
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Date
                    </th>
                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {ideas.map((idea) => (
                    <tr key={idea.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{idea.title}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                          {idea.shortDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                          {idea.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {idea.price !== undefined ? formatPrice(idea.price) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {idea.createdAt ? formatDate(idea.createdAt) : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end items-center space-x-2">
                          <Link
                            href={`/ideas/${idea.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <FiEye size={18} />
                          </Link>
                          <button
                            onClick={() => setShowConfirm(idea.id)}
                            disabled={deletingId === idea.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === idea.id ? (
                              <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <FiTrash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-200">
              {ideas.map((idea) => (
                <div key={idea.id} className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{idea.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {idea.shortDescription}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {idea.category && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {idea.category}
                      </span>
                    )}
                    {idea.price !== undefined && (
                      <span className="text-xs text-gray-600">
                        {formatPrice(idea.price)}
                      </span>
                    )}
                    {idea.createdAt && (
                      <span className="text-xs text-gray-600">
                        {formatDate(idea.createdAt)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/ideas/${idea.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-center text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => setShowConfirm(idea.id)}
                      disabled={deletingId === idea.id}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
                    >
                      {deletingId === idea.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Delete Idea?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this idea? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowConfirm(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(showConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ManageIdeasPage() {
  return (
    <ProtectedRoute>
      <ManageIdeasContent />
    </ProtectedRoute>
  );
}

