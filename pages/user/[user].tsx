import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SongInfo from '../../components/songinfo'
import { lastFmData } from '../../lib/types'
import Scene from '../../scene/scene'
import useInterval from 'use-interval'

const getLastFmData = async (user: string | string[] | undefined) => {
  const response = await fetch('/api/lastfm', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: user,
    }),
  })
  const lastFmResponse = await response.json()
  return lastFmResponse
}

const User = (): JSX.Element => {
  const router = useRouter()
  const { user } = router.query
  const [lastFmData, setLastFmData] = useState<null | lastFmData>()

  useEffect(() => {
    getLastFmData(user).then((songData) => setLastFmData(songData))
  }, [user])

  useInterval(() => {
    getLastFmData(user).then((songData) => setLastFmData(songData))
  }, 5000)

  return (
    <>
      {lastFmData && (
        <>
          <SongInfo song={lastFmData} />
          <Scene song={lastFmData} />
        </>
      )}
    </>
  )
}

export default User
