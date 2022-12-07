import 'jest';

import { createSpotifyClient } from './createSpotifyClient';

it('should create a spotify client and return it', async () => {
  const client = await createSpotifyClient("clientId", "clientSecret");
  expect(client).toBeDefined();
});
