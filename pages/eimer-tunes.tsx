import Layout from '../components/Layout';
import Link from 'next/link';
import Image from "next/image";
import ArrowIcon from '../components/ArrowIcon';
import Header from '../components/Header';
import SEO from '../components/SEO';
import { createSpotifyClient } from '../lib/spotify/createSpotifyClient';
import { fetchAllPlaylists } from '../lib/spotify/fetchAllPlaylists';
import { GetStaticProps, NextPage } from 'next';

type Playlists = Awaited<ReturnType<typeof fetchAllPlaylists>>;

export const LinkInBio: NextPage<{ playlists: Playlists }> = ({
  playlists,
}) => {
  return (
    <Layout>
      <SEO title={``} description={``} />
      <Header />
      <div className="pt-4 pb-12">
        <h1 className="w-full font-bold opacity-80 text-center text-3xl">EimerTunes</h1>
        <h3 className="w-full text-center text-xl py-2">
          Trying to break out of my filter bubble, I started creating monthly playlists, containing everythin from fresh finds, tracks I re-discovered or just discovered after their hype
        </h3>
      </div>
      <ul className="w-full">
        {playlists.map((playlist) => (
          <li key={playlist.id} className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0">
            <Link href={playlist.external_urls["spotify"]} target="_blank">
              <a className="flex flex-row items-center gap-4 md:gap-8 py-6 lg:py-10 px-6 lg:px-16 focus:outline-none focus:ring-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-20 h-20 md:w-32 md:h-32" alt={playlist.name} src={playlist.images.length === 1 ? playlist.images[0].url : playlist.images[1].url} />
                <p className="uppercase mb-3 font-bold opacity-60">
                  {playlist.name}
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default LinkInBio;

export const getStaticProps: GetStaticProps<{
  playlists: Awaited<ReturnType<typeof fetchAllPlaylists>>;
}> = async () => {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  const client = await createSpotifyClient(clientId, clientSecret);
  const playlists = await fetchAllPlaylists(client, 'eimerreis');

  const eimerTunes = playlists.filter((x) => x.name.includes('EimerTunes'));

  return {
    props: {
      playlists: eimerTunes,
    },
  };
};
