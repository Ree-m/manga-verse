import Image from "next/image";
const MangaCover = ({ manga }) => {
  return (
    <Image
      src={manga?.images?.jpg.image_url}
      alt={`Image of ${manga.title}`}
      height={300}
      width={300}
    />
  );
};

export default MangaCover;
