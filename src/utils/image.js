// [LEARN] Le backend stockait avant un chemin relatif ("/images/xxx.jpg") servi par
// [LEARN] lui-même. Depuis le passage à Cloudinary, il stocke une URL absolue
// [LEARN] ("https://res.cloudinary.com/..."). Ce helper gère les deux cas pour ne
// [LEARN] pas casser l'affichage des anciens articles créés avant la migration.
export function getImageUrl(image) {
  if (!image) return null;
  return image.startsWith('http') ? image : `${process.env.REACT_APP_API_URL}${image}`;
}
