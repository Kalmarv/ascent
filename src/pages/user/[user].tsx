import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import SongInfo from '../../components/songinfo'
import { lastFmData } from '../../types/types'
import useInterval from 'use-interval'
import { getLastFmData } from '../../lib/getLastFmData'
import dynamic from 'next/dynamic'
import Loading from '../../components/loading'
import { Leva } from 'leva'
import APIError from '../../components/apiError'
const Scene = dynamic(() => import('../../scene/scene'), { ssr: false, loading: () => <Loading /> })

const User = (): JSX.Element => {
  const router = useRouter()
  const { user } = router.query
  const [lastFmData, setLastFmData] = useState<null | lastFmData>()
  const [error, setError] = useState<null | string>()

  const getUserPlaying = useCallback(async () => {
    const apiResponse = await getLastFmData(user)
    if (apiResponse.error) {
      setError(apiResponse.message)
    } else {
      setLastFmData(apiResponse)
    }
  }, [user])

  // maybe useMemo here?
  useEffect(() => {
    getUserPlaying()
  }, [getUserPlaying, user])
  useInterval(() => {
    getUserPlaying()
  }, 5000)

  if (error) {
    return <APIError message={error} />
  }

  if (!lastFmData) {
    return <Loading />
  }

  return (
    <>
      <Leva />
      <Scene song={lastFmData} />
      <SongInfo song={lastFmData} />
    </>
  )
}

export default User
