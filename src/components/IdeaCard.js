import Link from 'next/link';
import { FiCalendar, FiDollarSign, FiTag } from 'react-icons/fi';

export default function IdeaCard({ idea }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-blue-300 group">
      {/* Image */}
      <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 relative overflow-hidden">
        {idea.imageUrl ? (
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl font-bold">💡</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
            {idea.title}
          </h3>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {idea.shortDescription}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap gap-3 mb-4 text-sm text-gray-500">
          {idea.price !== undefined && (
            <div className="flex items-center space-x-1">
              <FiDollarSign size={16} />
              <span>{formatPrice(idea.price)}</span>
            </div>
          )}
          {idea.createdAt && (
            <div className="flex items-center space-x-1">
              <FiCalendar size={16} />
              <span>{formatDate(idea.createdAt)}</span>
            </div>
          )}
          {idea.category && (
            <div className="flex items-center space-x-1">
              <FiTag size={16} />
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                {idea.category}
              </span>
            </div>
          )}
        </div>

        {/* View Details Button */}
        <Link
          href={`/ideas/${idea.id}`}
          className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

