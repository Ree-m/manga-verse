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
        <p>{text}</p>
        <br />
        <p>{text2}</p>
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
