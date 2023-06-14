import Link from "next/link";
import styles from "../styles/longButton.module.css"

export const LongButton = ({ content, href }) => {
  return (
    <div className={styles.longButton}>
        <Link href={href}>
      <button>{content}</button>
    </Link>

    </div> 
    
      
  );
};
