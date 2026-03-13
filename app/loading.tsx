import { PageLoading } from '@/components/site/page-loading';

export default function Loading() {
  return (
    <PageLoading
      eyebrow="Loading"
      title="Warming up the next page."
      messages={[
        'Tuning the editorial rhythm...',
        'Layering surfaces and stories...',
        'Almost there. Thanks for waiting.',
      ]}
    />
  );
}
