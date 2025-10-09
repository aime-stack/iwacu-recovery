import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; // <-- Added Image import
import { getArticleBySlug, getArticlesByCategory } from '@/lib/articles';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} | Iwacu Recovery Centre`,
    description: article.excerpt,
  };
}

// Helper function to format date consistently
function formatDate(dateString: string, format: 'long' | 'short' = 'long') {
  const date = new Date(dateString);
  
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      timeZone: 'UTC'
    });
  }
  
  return date.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric',
    timeZone: 'UTC'
  });
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  // Get related articles from the same category
  const relatedArticles = getArticlesByCategory(article.category)
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  // Determine the back link based on category
  const backLink = article.category === 'education' ? '/blog/education' : '/blog/recovery-stories';
  const backText = article.category === 'education' ? 'Back to Education Articles' : 'Back to Recovery Stories';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50 pt-32 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href={backLink}
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {backText}
        </Link>

        {/* Article Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center mr-3">
                <span className="text-lg">✍️</span>
              </div>
              <div>
                <div className="font-medium text-slate-900">{article.author}</div>
                <div className="text-sm text-slate-600">Author</div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-slate-300" />
            
            <div>
              <div className="font-medium text-slate-900">
                {formatDate(article.date, 'long')}
              </div>
              <div className="text-sm text-slate-600">Published</div>
            </div>
            
            {article.readTime && (
              <>
                <div className="h-8 w-px bg-slate-300" />
                <div>
                  <div className="font-medium text-slate-900">{article.readTime}</div>
                  <div className="text-sm text-slate-600">Reading Time</div>
                </div>
              </>
            )}
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-8 relative h-80">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg prose-slate max-w-none
            prose-headings:text-slate-900 prose-headings:font-bold
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-slate-800 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-slate-900 prose-strong:font-semibold
            prose-ul:my-6 prose-li:my-2 prose-li:text-slate-800
            prose-ol:my-6 prose-ol:text-slate-800
            prose-blockquote:border-l-4 prose-blockquote:border-blue-600
            prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-slate-800
            prose-img:rounded-lg prose-img:shadow-md
            prose-em:text-slate-700"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/'/g, "&apos;") }} // <-- Escape apostrophes
        />

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-200">
          <div className="bg-gradient-to-r from-blue-50 to-pink-50 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Need Support?
            </h3>
            <p className="text-slate-800 mb-6 max-w-2xl mx-auto">
              If you or someone you know is struggling with addiction, we&apos;re here to help. 
              Reach out to Iwacu Recovery Centre for confidential support and guidance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/programs"
                className="px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors"
              >
                Our Programs
              </Link>
            </div>
          </div>
        </footer>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Related {article.category === 'education' ? 'Articles' : 'Stories'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  href={`/blog/${article.category === 'education' ? 'education' : 'recovery-stories'}/${relatedArticle.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-sm text-slate-700 line-clamp-2 mb-3">
                      {relatedArticle.excerpt}
                    </p>
                    <div className="text-sm text-slate-600">
                      {formatDate(relatedArticle.date, 'short')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
