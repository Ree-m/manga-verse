
export async function fetchChapters(mangaTitle) {
  console.log("in scarper,allowed origin", process.env.ALLOWED_ORIGIN)
console.log("in scraper", process.env.NEXT_PUBLIC_SCRAPER_API)

  const response = await fetch(`${process.env.NEXT_PUBLIC_SCRAPER_API}/chapters?title=${mangaTitle}`, 

  );

  const chapters = await response.json();
  return chapters;
}
