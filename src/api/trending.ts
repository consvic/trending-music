import { Track } from "../types/Track.interface";

export async function getTrending(): Promise<Track[]> {
  return fetch("https://discoveryprovider.audius.co/v1/tracks/trending")
    .then((res) => res.json())
    .then(({ data }) => data);
}
