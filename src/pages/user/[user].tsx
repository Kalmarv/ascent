import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import useInterval from 'use-interval'
import APIError from '../../components/apiError'
import Loading from '../../components/loading'
import SceneOptions from '../../components/sceneOptions'
import Tweakpane from '../../components/Tweakpane'
import { getLastFmData } from '../../lib/getLastFmData'
import { lastFmData } from '../../types/types'
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
      <Scene song={lastFmData} />
      <SceneOptions />
      <Tweakpane />
    </>
  )
}

export default User
