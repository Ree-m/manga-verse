export async function fetchManga(id) {
  const response = await fetch(`https://api.jikan.moe/v4/manga/${id}`);
  const manga = await response.json();
  return manga;
}
