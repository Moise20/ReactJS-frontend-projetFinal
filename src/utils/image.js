export function getImageUrl(image) {
  if (!image) return null;
  return image.startsWith('http') ? image : `${process.env.REACT_APP_API_URL}${image}`;
}
