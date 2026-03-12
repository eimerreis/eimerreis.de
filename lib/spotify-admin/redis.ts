import 'server-only';

import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

let redisClientPromise: Promise<RedisClient> | null = null;

const getRedisUrl = () => {
  const redisUrl = process.env.REDIS_URL;

  if (!redisUrl) {
    throw new Error('REDIS_URL is missing. Set REDIS_URL for Spotify token storage.');
  }

  return redisUrl;
};

export const getRedisClient = () => {
  if (!redisClientPromise) {
    const redisClient = createClient({
      url: getRedisUrl(),
    });

    redisClientPromise = redisClient.connect().then(() => redisClient);
  }

  return redisClientPromise;
};
