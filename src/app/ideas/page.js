'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IdeaCard from '@/components/IdeaCard';
import { ideasAPI, categoriesAPI } from '@/lib/api';
import { FiSearch, FiFilter } from 'react-icons/fi';

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchIdeas();
    fetchCategories();
  }, [searchQuery, selectedCategory]);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const params = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedCategory !== 'all') params.category = selectedCategory;

      const response = await ideasAPI.getAll(params);
      if (response.success) {
        setIdeas(response.ideas || []);
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      if (response.success) {
        setCategories(response.categories || []);
      } else {
        // If categories fail to load, just log and continue with empty array
        console.warn('Categories could not be loaded:', response.error);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Set empty array to prevent UI errors
      setCategories([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Ideas</h1>
          <p className="text-lg text-gray-600">
            Browse through all the creative ideas shared by our community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search ideas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Ideas Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💡</div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No ideas found</h3>
            <p className="text-gray-600">
              {searchQuery || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria'
                : 'Be the first to share an idea!'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

