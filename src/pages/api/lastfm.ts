import type { NextApiRequest, NextApiResponse } from 'next'
import { getFullImage } from '../../lib/getFullImage'
import { lastFmData, LastFmResponse } from '../../types/types'

const lastFmURL = (user: string): string => {
  return `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${process.env.LASTFM_KEY}&limit=1&format=json`
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username } = req.body

  const fetchData = async () => {
    if (username) {
      const response = await fetch(lastFmURL(username))
      const data: LastFmResponse = await response.json()
      if (data.error) {
        res.status(400).json(data)
        return
      }
      const image = await getFullImage(data.recenttracks.track[0].image[0]['#text'])

      const returnData: lastFmData = {
        artist: data.recenttracks.track[0].artist['#text'],
        album: data.recenttracks.track[0].album['#text'],
        track: data.recenttracks.track[0].name,
        image: image,
        url: data.recenttracks.track[0].url,
      }
      //FIXME: Fix types
      res.status(200).json(returnData)
    }
  }

  fetchData()
}
