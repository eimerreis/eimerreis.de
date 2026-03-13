import { PageLoading } from '@/components/site/page-loading';

export default function Loading() {
  return (
    <PageLoading
      eyebrow="Writing"
      title="Opening the archive."
      messages={['Dusting off recent notes...', 'Aligning thoughts by year...', 'Preparing your next rabbit hole.']}
    />
  );
}
