export const getFullImage = async (imageURL: string): Promise<string> => {
  if (imageURL.includes('/34s/')) {
    const url1 = imageURL.replace('/34s/', '/')
    const test1 = await fetch(url1, {
      method: 'HEAD',
    })
    if (test1.ok) {
      return url1
    } else {
      // TODO: local placeholder image
      return 'https://via.placeholder.com/300'
    }
  }
  return imageURL
}
