export const getFullImage = (imageURL: string): string => {
  if (imageURL.includes("/34s/")) {
    return imageURL.replace("/34s/", "/");
  }
  return imageURL;
};
