import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FiTarget, FiUsers, FiHeart } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">About Ideas Parking Lot</h1>
          <p className="text-xl text-gray-600">
            Your trusted companion for capturing and organizing creative thoughts
          </p>
        </div>

        <div className="prose max-w-none mb-12">
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Ideas Parking Lot was born from a simple observation: great ideas are everywhere, but they're often lost in the chaos of daily life. We created this platform to give you a dedicated space to park your thoughts, organize them, and never lose a creative spark again.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Whether you're an entrepreneur brainstorming business concepts, a writer capturing story ideas, or a creative professional organizing project concepts, Ideas Parking Lot provides the tools you need to keep everything in one beautiful, accessible place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiTarget className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To help people capture, organize, and never lose their creative ideas
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiUsers className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Community</h3>
            <p className="text-gray-600">
              Join thousands of users who trust Ideas Parking Lot with their ideas
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <FiHeart className="text-blue-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Values</h3>
            <p className="text-gray-600">
              Simplicity, security, and a commitment to helping you succeed
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get Started Today</h2>
          <p className="text-gray-700 mb-6">
            Ready to start parking your ideas? Create a free account and begin organizing your creative thoughts today.
          </p>
          <a
            href="/login?mode=register"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign Up Free
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}

