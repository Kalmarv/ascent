export const getFullImage = async (imageURL: string): Promise<string> => {
  console.log(imageURL)
  if (imageURL.includes('/34s/')) {
    const fullImageURL = imageURL.replace('/34s/', '/')
    const testCDN = await fetch(fullImageURL, {
      method: 'HEAD',
    })
    if (testCDN.ok) {
      return fullImageURL
    } else {
      // TODO: local placeholder image
      return 'https://via.placeholder.com/300'
    }
  }
  return imageURL
}
