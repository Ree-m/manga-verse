
export async function fetchChapters(mangaTitle) {

  const response = await fetch(`${process.env.NEXT_PUBLIC_SCRAPER_API}/chapters?title=${mangaTitle}`, 

  );

  const chapters = await response.json();
  return chapters;
}
