import Link from "next/link";
import MangaCover from "./MangaCover";
import ReadMore from "./ReadMore";
import {GiSandsOfTime} from "react-icons/gi"
import MangaDetail from "./MangaDetail";

import {BsFillPersonFill} from "react-icons/bs"
import styles from "../styles/mangaDetails.module.css";
const MangaDetails = ({ mangas }) => {



  return (
    <div className={styles.grid} >
      {mangas &&
        mangas.map((manga,index) => (
         <MangaDetail key={index} manga={manga}/>
        ))}
    </div>
  );
};

export default MangaDetails;
