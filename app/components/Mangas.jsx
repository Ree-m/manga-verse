async function fetchMangas() {
  const response = await fetch(`https://api.jikan.moe/v4/manga/1`);
  const mangas = await response.json();
  return mangas.data;
}
const Mangas = async () => {
  const mangas = await fetchMangas();
  console.log(mangas)
  return (
    <>
      {mangas &&  
        <div>
          <p>{console.log("this is manga", mangas)}</p>
          <h1>{mangas.title}</h1>
          <p>{mangas.synopsis}</p>
        </div>
      }
    </>
  );
};

export default Mangas;
