'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getArticleBySlug, getArticlesByCategory } from './articles';

type URLCategory = 'education' | 'recovery-stories';
type ArticleCategory = 'education' | 'recovery' | 'mentalHealth' | 'wellness';

interface ArticlePageProps {
  slug: string;
  category: URLCategory;
}

function formatDate(dateString: string, format: 'long' | 'short' = 'long') {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', format === 'short'
    ? { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
    : { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }
  );
}

export default function ArticlePage({ slug, category }: ArticlePageProps) {
  const article = getArticleBySlug(slug);
  if (!article) return <p>Article not found.</p>;

  const articleCategory: ArticleCategory = category === 'recovery-stories' ? 'recovery' : category;

  const relatedArticles = getArticlesByCategory(articleCategory)
    .filter(a => a.id !== article.id)
    .slice(0, 3);

  const backLink = category === 'education' ? '/blog/education' : '/blog/recovery-stories';
  const backText = category === 'education' ? 'Back to Education Articles' : 'Back to Recovery Stories';

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-pink-50 pt-32 pb-16">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href={backLink} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 group">
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {backText}
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-slate-600 mb-6">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-pink-100 flex items-center justify-center mr-3">✍️</div>
              <div>
                <div className="font-medium text-slate-900">{article.author}</div>
                <div className="text-sm text-slate-600">Author</div>
              </div>
            </div>
            <div className="h-8 w-px bg-slate-300" />
            <div>
              <div className="font-medium text-slate-900">{formatDate(article.date, 'long')}</div>
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

          {article.image && (
            <div className="rounded-xl overflow-hidden shadow-lg mb-8 relative h-80">
              <Image src={article.image} alt={article.title} fill className="object-cover" priority />
            </div>
          )}
        </header>

        <div
          className="prose prose-lg prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content.replace(/'/g, "&apos;") }}
        />

        {relatedArticles.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Related {category === 'education' ? 'Articles' : 'Stories'}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedArticles.map((related) => (
                <Link key={related.id} href={`/blog/${category}/${related.slug}`} className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">{related.title}</h3>
                    <p className="text-sm text-slate-700 line-clamp-2 mb-3">{related.excerpt}</p>
                    <div className="text-sm text-slate-600">{formatDate(related.date, 'short')}</div>
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
