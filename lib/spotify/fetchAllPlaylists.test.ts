import { createSpotifyClient } from "./createSpotifyClient"
import { fetchAllPlaylists } from "./fetchAllPlaylists";


it("should fetch all playlists of the user", async () => {
    const client = await createSpotifyClient("clientId", "clientSecret");
    const playlists = await fetchAllPlaylists(client, "userId")
    expect(playlists.length).toBe(100);
})