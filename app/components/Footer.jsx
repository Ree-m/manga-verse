import styles from "../styles/footer.module.css";
const Footer = () => {
  const email = "reembsrat@gmail.com";
  const github = "https://github.com/Ree-m";

  return (
    <div className={styles.footer}>
      <div className={styles.footerNav}>
        <h5>About Us</h5>
        <p>
          Email: <a href={`mailto:${email}`}>{email}</a>
        </p>
        <p>
          Github: <a href={github}>{github}</a>
        </p>
      </div>
      <div className={styles.center}>
        <p>©2023 Manga App, all rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
