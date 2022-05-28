import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SongInfo from '../../components/songinfo'
import { lastFmData } from '../../lib/types'
import Scene from '../../scene/scene'

const User = () => {
  const router = useRouter()
  const { user } = router.query
  const [lastFmData, setLastFmData] = useState<null | lastFmData>()

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('/api/lastfm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user,
        }),
      })
      const data = await response.json()
      setLastFmData(data)
    }

    getData()
  }, [user])

  return (
    <>
      {lastFmData && <SongInfo song={lastFmData} />}
      <Scene />
    </>
  )
}

export default User
