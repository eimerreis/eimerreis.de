import '@testing-library/jest-dom/extend-expect';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('https://accounts.spotify.com/api/token', (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        access_token:
          'BQCnXkGIuJv0wvexwfCYhdKMd9SSdF9cIHUYXgA2u9BHZtqqEKY_RqZFeGz5ROh1KjVu6K4TlMvOPbi7tzECC7fPJ7Yu9gRUfgxc8nX-m1Jcd3xH4Gg',
        token_type: 'Bearer',
        expires_in: 3600,
      })
    );
  }),
  rest.get(
    'https://api.spotify.com/v1/users/:userId/playlists',
    (req, res, ctx) => {
      const offset = req.url.searchParams.get('offset');
      const limit = req.url.searchParams.get('limit');

      const data = require('./__mocks__/playlistResponse.json');
      data.limit = limit;
      data.offset = offset;
      return res(ctx.status(200), ctx.json(data));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
