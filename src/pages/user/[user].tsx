import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SongInfo from '../../components/songinfo'
import { lastFmData } from '../../types/types'
import Scene from '../../scene/scene'
import useInterval from 'use-interval'
import { getLastFmData } from '../../lib/getLastFmData'

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
          <Scene song={lastFmData} />
          <SongInfo song={lastFmData} />
        </>
      )}
    </>
  )
}

export default User
