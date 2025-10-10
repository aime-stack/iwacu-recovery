import ArticlePage from '@/lib/ArticlePage';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { category, slug } = await params;

  const urlCategory = category as 'education' | 'recovery-stories';

  return <ArticlePage slug={slug} category={urlCategory} />;
}