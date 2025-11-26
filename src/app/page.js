'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import IdeaCard from '@/components/IdeaCard';
import Link from 'next/link';
import { ideasAPI } from '@/lib/api';
import { FiZap, FiSearch, FiShield, FiTrendingUp, FiUsers, FiAward } from 'react-icons/fi';

export default function Home() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      setLoading(true);
      const response = await ideasAPI.getAll();
      if (response.success && response.ideas) {
        // Get first 6 ideas, sorted by most recent
        setIdeas(response.ideas.slice(0, 6));
      }
    } catch (error) {
      console.error('Error fetching ideas:', error);
      setIdeas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Park Your Ideas
              <span className="block text-blue-600 mt-2">Never Lose a Thought</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              A digital parking lot for your creative ideas. Save, organize, and manage your thoughts all in one beautiful place.
            </p>
            <Link
              href="/login?mode=register"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Parking Ideas
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Ideas Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Ideas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most recent creative ideas from our community
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : ideas.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {ideas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/ideas"
                  className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  View All Ideas
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">💡</div>
              <p className="text-gray-600 text-lg mb-6">No ideas yet. Be the first to share one!</p>
              <Link
                href="/login?mode=register"
                className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Ideas Parking Lot?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to capture and organize your creative thoughts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FiZap size={40} />,
                title: 'Easy Capture',
                description: 'Quickly save your ideas with just a few clicks. No complicated forms or processes.',
              },
              {
                icon: <FiSearch size={40} />,
                title: 'Smart Search',
                description: 'Find your ideas instantly with powerful search and filtering capabilities.',
              },
              {
                icon: <FiShield size={40} />,
                title: 'Secure Storage',
                description: 'Your ideas are safely stored and accessible only to you.',
              },
              {
                icon: <FiTrendingUp size={40} />,
                title: 'Track Progress',
                description: 'Organize ideas by category, priority, and date to track your progress.',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example Ideas Showcase */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Ideas</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how others are using Ideas Parking Lot to organize their thoughts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Mobile App Concept',
                category: 'Technology',
                description: 'A revolutionary app idea that could change how we interact with mobile devices.',
              },
              {
                title: 'Sustainable Business Model',
                category: 'Business',
                description: 'An eco-friendly business idea that combines profit with environmental responsibility.',
              },
              {
                title: 'Creative Writing Project',
                category: 'Creative',
                description: 'A novel concept that explores themes of innovation and human connection.',
              },
            ].map((idea, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-white text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{idea.title}</h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm mb-3">
                  {idea.category}
                </span>
                <p className="text-gray-600">{idea.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/ideas"
              className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse All Ideas
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Users Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of users who trust Ideas Parking Lot
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Entrepreneur',
                content: 'Ideas Parking Lot has transformed how I capture and organize my thoughts. It&apos;s become an essential tool in my workflow.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Designer',
                content: 'The clean interface and powerful features make it easy to keep track of all my creative ideas. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Emily Rodriguez',
                role: 'Writer',
                content: 'I love how simple it is to add ideas and the search functionality helps me find exactly what I need when I need it.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg border border-gray-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Benefits Banner */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: <FiUsers size={48} />, number: '10K+', label: 'Active Users' },
              { icon: <FiZap size={48} />, number: '50K+', label: 'Ideas Saved' },
              { icon: <FiAward size={48} />, number: '4.9/5', label: 'User Rating' },
              { icon: <FiZap size={48} />, number: '99.9%', label: 'Uptime' },
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="mb-4 opacity-90">{stat.icon}</div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Sign Up',
                description: 'Create your free account in seconds. No credit card required.',
              },
              {
                step: '2',
                title: 'Add Ideas',
                description: 'Start parking your ideas with titles, descriptions, categories, and more.',
              },
              {
                step: '3',
                title: 'Organize & Manage',
                description: 'Search, filter, and organize your ideas to keep everything in order.',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 max-w-sm mx-auto">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
