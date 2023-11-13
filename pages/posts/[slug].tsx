import { getGlobalData } from '../../utils/global-data';
// core styles shared by all of react-notion-x (required)
import { Code } from 'react-notion-x/build/third-party/code';
import { Equation } from 'react-notion-x/build/third-party/equation';
import { Modal } from 'react-notion-x/build/third-party/modal';
import { Pdf } from 'react-notion-x/build/third-party/pdf';

import { postFilePaths } from '../../utils/mdx-utils';

import Head from 'next/head';
import Link from 'next/link';
import ArrowIcon from '../../components/ArrowIcon';
import CustomLink from '../../components/CustomLink';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Layout, { GradientBackground } from '../../components/Layout';
import SEO from '../../components/SEO';
import { filterRelevantPages, getDatabase, sortByPublishDate } from '../../lib/notion/getDatabase';
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client';
import { ThemeContext } from '../../components/ThemeContext';
import React from 'react';

export default function PostPage({ source, page, prevPost, nextPost, globalData }) {
  // Set the value received from the local storage to a local state
  const theme = React.useContext(ThemeContext);

  return (
    <>
      <SEO title={`${page.title} - ${globalData.name}`} description={page.title} />
      <Header name={globalData.name} />
      <article>
        <header>
          <h1 className="text-3xl md:text-5xl dark:text-white text-center mb-12">{page.title}</h1>
        </header>
        <main>
          <article className="prose dark:prose-dark">
            <NotionRenderer
              darkMode={theme === 'dark'}
              recordMap={source}
              components={{
                Code,
                // Collection,
                Equation,
                Modal,
                Pdf,
              }}
            />
          </article>
        </main>
        <div className="grid md:grid-cols-2 lg:-mx-24 mt-12">
          {prevPost && (
            <Link href={`/posts/${prevPost.slug}`}>
              <a className="py-8 px-10 text-center md:text-right first:rounded-t-lg md:first:rounded-tr-none md:first:rounded-l-lg last:rounded-r-lg first last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 last:border-t md:border-r-0 md:last:border-r md:last:rounded-r-none flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">Previous</p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">{prevPost.title}</h4>
                <ArrowIcon className="transform rotate-180 mx-auto md:mr-0 mt-auto" />
              </a>
            </Link>
          )}
          {nextPost && (
            <Link href={`/posts/${nextPost.slug}`}>
              <a className="col-start-2 py-8 px-10 text-center md:text-left md:first:rounded-t-lg last:rounded-b-lg first:rounded-l-lg md:last:rounded-bl-none md:last:rounded-r-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-t-0 first:border-t first:rounded-t-lg md:border-t border-b-0 last:border-b flex flex-col">
                <p className="uppercase text-gray-500 mb-4 dark:text-white dark:opacity-60">Next</p>
                <h4 className="text-2xl text-gray-700 mb-6 dark:text-white">{nextPost.title}</h4>
                <ArrowIcon className="mt-auto mx-auto md:ml-0" />
              </a>
            </Link>
          )}
        </div>
      </article>
    </>
  );
}

export const getStaticProps = async ({ params }) => {
  const globalData = getGlobalData();
  const posts = (await getDatabase(process.env.NOTION_DATABASE_ID)).filter(filterRelevantPages).sort(sortByPublishDate);

  const index = posts.findIndex((x) => x.slug === params.slug);

  const page = posts[index];
  const notionApi = new NotionAPI({
    activeUser: process.env.NOTION_USER_ID,
    authToken: process.env.NOTION_TOKEN_V2,
  });
  const recordMap = await notionApi.getPage(page.id);

  const prevPost = index === posts.length - 1 ? null : posts[index + 1];
  const nextPost = index === 0 ? null : posts[index - 1];

  return {
    props: {
      globalData,
      page: page,
      source: recordMap,
      prevPost,
      nextPost
    },
  };
};

export const getStaticPaths = async () => {
  const notionPages = (await getDatabase(process.env.NOTION_DATABASE_ID)).filter(filterRelevantPages).map((page) => ({
    params: { slug: page.slug },
  }));

  notionPages.forEach((path) => console.log(`Notion --- 📄 ${path.params.slug} 📄`));

  return {
    paths: [...notionPages],
    fallback: false,
  };
};
