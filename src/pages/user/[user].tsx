import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import { lastFmData } from '../../types/types'
import useInterval from 'use-interval'
import { getLastFmData } from '../../lib/getLastFmData'
import dynamic from 'next/dynamic'
import Loading from '../../components/loading'
import { Leva } from 'leva'
import APIError from '../../components/apiError'
import SceneOptions from '../../components/sceneOptions'
import Head from 'next/head'
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
      <Head>
        <title>Ascent - {user}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Leva collapsed={true} />
      <Scene song={lastFmData} />
      <SceneOptions />
    </>
  )
}

export default User
