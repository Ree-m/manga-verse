import Link from "next/link";
function LoadingChapter() {
  return (
    <div>
        <p>
        The bot is fetching you chapter ...<br/>
        In the mean time, read the latest chapter of One piece <Link target="_blank" href="https://manga-verse-beta.vercel.app/mangas/13/chapter-1084">here</Link>
        </p>

    </div>
  )
}

export default LoadingChapter