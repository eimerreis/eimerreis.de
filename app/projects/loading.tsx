import { PageLoading } from '@/components/site/page-loading';

export default function Loading() {
  return (
    <PageLoading
      eyebrow="Projects"
      title="Unpacking the build shelf."
      messages={[
        'Cataloguing tools and experiments...',
        'Bringing side quests into focus...',
        'Almost ready to browse.',
      ]}
    />
  );
}
