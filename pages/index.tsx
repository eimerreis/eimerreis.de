import Link from 'next/link';
import { getPosts } from '../utils/mdx-utils';
import PlausibleProvider from 'next-plausible';

import Header from '../components/Header';
import ArrowIcon from '../components/ArrowIcon';
import { getGlobalData } from '../utils/global-data';
import SEO from '../components/SEO';
import { filterRelevantPages, getDatabase, sortByPublishDate } from '../lib/notion/getDatabase';

export default function Index({ posts, globalData }) {
  return (
    <PlausibleProvider domain="eimerreis.de">
      <SEO title={globalData.name} description={globalData.blogTitle} />
      <Header name={globalData.name} />
      <main className="w-full">
        <p className="text-xl lg:text-xl mb-12">{globalData.blogTitle}</p>
        <span></span>
        <ul className="w-full">
          {posts.map((post) => (
            <li
              key={post.filePath}
              className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
            >
              <Link as={`/posts/${post.slug}`} href={`/posts/[slug]`}>
                <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                  <p className="uppercase mb-3 font-bold opacity-60">
                    {new Date(post.publishDate).toLocaleDateString('de-DE', {
                      year: 'numeric',
                      month: '2-digit',
                      day: 'numeric',
                    })}
                  </p>

                  <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                  {post.description && (
                    <p className="mt-3 text-lg opacity-60">
                      {post.description}
                    </p>
                  )}
                  <ArrowIcon className="mt-4" />
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </PlausibleProvider>
  );
}

export async function getStaticProps() {
  const posts = (await getDatabase(process.env.NOTION_DATABASE_ID))
    .filter(filterRelevantPages)
    .sort(sortByPublishDate)

  const globalData = getGlobalData();

  return { props: { posts, globalData } };
}
