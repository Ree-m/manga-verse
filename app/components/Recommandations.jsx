
async function fetchRecommandations(mangaId){
    const response =await fetch(`https://api.jikan.moe/v4/manga/${mangaId}/recommendations`)
    const data=await response.json()
console.log("this is recomm data",data)
}
const Recommandations = async ({manga}) => {
    const recommendedMangas = await fetchRecommandations(manga.mal_id)
    console.log("reccommended mangas",recommendedMangas)
  return (
    <div>
        {/* {recommendedMangas.data?.map((manga)=>(
            // <h1>{manga.entry.title}</h1>
        ))} */}
    </div>
  )
}

export default Recommandations
