import { lastFmData, LastFmResponse } from "./../types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

const lastFmURL = (user: string): string => {
  return `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${process.env.LASTFM_KEY}&limit=1&format=json`;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { username } = req.body;

  const fetchData = async () => {
    if (username) {
      const response = await fetch(lastFmURL(username));
      const data: LastFmResponse = await response.json();
      const returnData: lastFmData = {
        artist: data.recenttracks.track[0].artist["#text"],
        album: data.recenttracks.track[0].album["#text"],
        track: data.recenttracks.track[0].name,
        image: data.recenttracks.track[0].image[0]["#text"],
        url: data.recenttracks.track[0].url,
      };
      res.status(200).json(returnData);
    }
  };

  fetchData();
}
