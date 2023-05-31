"use client";
import { useState } from "react";
import styles from "../styles/showLess.module.css";

const ShowLess = ({ manga }) => {
  const [showMore, setShowMore] = useState(false);
  const text = manga?.synopsis?.replace(/\[Written by MAL Rewrite\]/g, "");

  return (
    <div>
      <div className={showMore ? styles.showLess : styles.showMore}>
        <p>{text}</p>
      </div>
      <div className={styles.showMoreButtonContainer}>
        <button
          className={styles.showMoreButton}
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
       
      </div>
    </div>
  );
};

export default ShowLess;
