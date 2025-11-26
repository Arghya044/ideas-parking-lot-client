'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ideasAPI } from '@/lib/api';
import { FiArrowLeft, FiCalendar, FiDollarSign, FiTag, FiUser } from 'react-icons/fi';

export default function IdeaDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdea();
  }, [params.id]);

  const fetchIdea = async () => {
    try {
      setLoading(true);
      const response = await ideasAPI.getById(params.id);
      if (response.success) {
        setIdea(response.idea);
      } else {
        router.push('/ideas');
      }
    } catch (error) {
      console.error('Error fetching idea:', error);
      router.push('/ideas');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center py-20">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!idea) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          href="/ideas"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
        >
          <FiArrowLeft />
          <span>Back to Ideas</span>
        </Link>

        {/* Banner Image */}
        <div className="h-64 md:h-96 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg mb-8 overflow-hidden">
          {idea.imageUrl ? (
            <img
              src={idea.imageUrl}
              alt={idea.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-white text-6xl">💡</span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{idea.title}</h1>

          {/* Metadata */}
          <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
            {idea.price !== undefined && (
              <div className="flex items-center space-x-2 text-gray-600">
                <FiDollarSign />
                <span className="font-semibold">{formatPrice(idea.price)}</span>
              </div>
            )}
            {idea.createdAt && (
              <div className="flex items-center space-x-2 text-gray-600">
                <FiCalendar />
                <span>{formatDate(idea.createdAt)}</span>
              </div>
            )}
            {idea.category && (
              <div className="flex items-center space-x-2">
                <FiTag />
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {idea.category}
                </span>
              </div>
            )}
            {idea.priority && (
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                  Priority: {idea.priority}
                </span>
              </div>
            )}
          </div>

          {/* Short Description */}
          {idea.shortDescription && (
            <p className="text-xl text-gray-700 mb-6 font-medium">{idea.shortDescription}</p>
          )}

          {/* Full Description */}
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {idea.fullDescription}
            </p>
          </div>

          {/* Author Info */}
          {idea.user && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                {idea.user.image ? (
                  <img
                    src={idea.user.image}
                    alt={idea.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <FiUser className="text-white" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{idea.user.name}</p>
                  <p className="text-sm text-gray-600">{idea.user.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

