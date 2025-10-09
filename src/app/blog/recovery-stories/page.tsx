import Link from 'next/link';
import Image from 'next/image'; // <-- Added Image import
import { getArticlesByCategory } from '@/lib/articles';

export const metadata = {
  title: 'Recovery Stories | Iwacu Recovery Centre',
  description: 'Read inspiring stories of hope, healing, and transformation from our recovery community.',
};

export default function RecoveryStoriesPage() {
  const articles = getArticlesByCategory('recovery');

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50 pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Recovery <span className="text-blue-500">Stories</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Read inspiring stories of hope, healing, and transformation from individuals who have found recovery.
          </p>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/recovery-stories/${article.slug}`}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Featured Image (if available) */}
                {article.image && (
                  <div className="h-48 bg-gradient-to-br from-blue-100 to-pink-100 overflow-hidden relative">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority
                    />
                  </div>
                )}
                
                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  
                  <p className="text-slate-600 mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>{article.author}</span>
                    <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  
                  {article.readTime && (
                    <div className="mt-3 text-sm text-blue-600">
                      {article.readTime}
                    </div>
                  )}
                  
                  {/* Read More Arrow */}
                  <div className="mt-4 flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                    Read Story
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">💚</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Stories Yet</h3>
            <p className="text-slate-600">Check back soon for inspiring recovery stories!</p>
          </div>
        )}
      </div>
    </div>
  );
}