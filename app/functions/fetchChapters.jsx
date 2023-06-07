export async function fetchChapters(mangaTitle) {
  const response = await fetch(`http://localhost:9000/chapters`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: mangaTitle,
    }),
  });

  const chapters = await response.json();
  return chapters;
}
