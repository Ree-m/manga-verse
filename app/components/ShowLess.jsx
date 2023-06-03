"use client";
import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
import { AiOutlineArrowUp } from "react-icons/ai";
import styles from "../styles/showLess.module.css";

const ShowLess = ({ manga }) => {
  const [showMore, setShowMore] = useState(false);
  const text = manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, "");
  const text2 = manga?.background;
 
  return (
    <div className={styles.description}>
      <div className={showMore ? styles.showLess : styles.showMore}>
        <p>{text=="" ? "Until This Social Outcast Becomes My Wife... summary is updating. Come visit MangaNato.com sometime to read the latest chapter of Until This Social Outcast Becomes My Wife.... If you have any question about this manga, Please don't hesitate to contact us or translate team. Hope you enjoy it.":text}</p>
        <br />
        <p>{text=="" ? "": text2}</p>
      </div>
      <div className={styles.showMoreButtonContainer}>
        <button
          className={styles.showMoreButton}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
          {showMore ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
        </button>
      </div>
    </div>
  );
};

export default ShowLess;
