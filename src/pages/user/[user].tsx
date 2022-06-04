import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SongInfo from '../../components/songinfo'
import { lastFmData } from '../../types/types'
import useInterval from 'use-interval'
import { getLastFmData } from '../../lib/getLastFmData'
import dynamic from 'next/dynamic'
import Loading from '../../components/loading'
const Scene = dynamic(() => import('../../scene/scene'), { ssr: false, loading: () => <Loading /> })

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
