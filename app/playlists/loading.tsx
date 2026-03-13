import { PageLoading } from '@/components/site/page-loading';

export default function Loading() {
  return (
    <PageLoading
      eyebrow="Spotify"
      title="Curating monthly moods."
      messages={['Collecting recent sonic favorites...', 'Syncing covers and track counts...', 'Queue almost ready.']}
    />
  );
}
