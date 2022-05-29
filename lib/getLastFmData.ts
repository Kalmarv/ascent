export const getLastFmData = async (user: string | string[] | undefined) => {
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
