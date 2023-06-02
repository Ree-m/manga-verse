import Image from "next/image";
import styles from '../styles/mangaCover.module.css'
const MangaCover = ({ manga,height,width }) => {
  return (
    <Image

      src={manga?.images?.jpg.image_url}
      alt={`Image of ${manga?.title}`}
      height={height}
      width={width}
    /> 
  );
};

export default MangaCover;
