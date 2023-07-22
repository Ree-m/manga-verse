"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import loadingGif from "../styles/assests/background-black.png";
import styles from "../styles/carousel.module.css";
const CarouselComponent = () => {
  const [items, setItems] = useState([]);
  const [isItemLoading, setIsItemLoading] = useState(true);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 13,
    },
    d: {
      breakpoint: { max: 2000, min: 1801 },
      items: 11,
    },
    c: {
      breakpoint: { max: 1800, min: 1501 },
      items: 10,
    },
    b: {
      breakpoint: { max: 1500, min: 1351 },
      items: 9,
    },
    desktop: {
      breakpoint: { max: 1350, min: 1151 },
      items: 7,
    },
    a: {
      breakpoint: { max: 1150, min: 1031 },
      items: 7,
    },
    biggerTablet: {
      breakpoint: { max: 1030, min: 851 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 850, min: 464 },
      items: 5,
    },
  };

  useEffect(() => {
    async function fetchCarouselItems() {
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?order_by=popularity&sort=desc&limit=25&min_score=1&sfw`
      );
      const data = await response.json();
      setItems(data.data);

      setIsItemLoading(false);
    }
    fetchCarouselItems();
  }, []);

  return (
    <div className={styles.carouselComponent}>
      <div className={styles.title}>
        <h2>Top Week</h2>
      </div>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        //   showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true} // Enable auto play
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {items &&
          items.length > 0 &&
          items.map((item) => {
            return (
              <div className={styles.carouselItemConatiner} key={item.mal_id}>
                <Link href={`/mangas/${item.mal_id}`}>
                  <div className={styles.imgContainer}>
                    <img
                      src={item.images?.webp.image_url}
                      alt={`Image of ${item?.title}`}
                      className={styles.img}
                    />
                  </div>
                </Link>
                <Link href={`/mangas/${item.mal_id}`}>
                  <h3 className={styles.carouselItemTitle}>
                    {item.title?.length < 15
                      ? item.title
                      : item.title?.substring(0, 15) + "..."}
                  </h3>
                </Link>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
};
export default CarouselComponent;
