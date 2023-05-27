import Image from "next/image";
import styles from '../styles/mangaCover.module.css'
const MangaCover = ({ manga }) => {
  return (
    <Image

      src={manga?.images?.jpg.image_url}
      alt={`Image of ${manga?.title}`}
      height={250}
      width={250}
    /> 
  );
};

export default MangaCover;
