import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { lastFmData } from '../../lib/types'

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
      <h1>{lastFmData?.track}</h1>
      <h2>{lastFmData?.artist}</h2>
      <h2>{lastFmData?.album}</h2>
      <a href={lastFmData?.url}>
        <img className="m-16 w-1/2 rounded-lg" src={lastFmData?.image}></img>
      </a>

      <p>User: {user}</p>
    </>
  )
}

export default User
