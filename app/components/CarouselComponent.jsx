"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import loadingGif from "../styles/assests/background-black.png"
import styles from "../styles/carousel.module.css";
const CarouselComponent = () => {
  const [items, setItems] = useState([]);
  const [isItemLoading, setIsItemLoading] = useState(true);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 11,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
    },
  };

  useEffect(() => {
    async function fetchCarouselItems() {
      console.log("carousel isItemLoading check", isItemLoading);
      const response = await fetch(
        `https://api.jikan.moe/v4/manga?order_by=popularity&sort=desc&limit=15&min_score=1`
      );
      const data = await response.json();
      setItems(data.data);

      setIsItemLoading(false);
      console.log("carousel setIsItemLoading ", isItemLoading);
      console.log("carousel items fetched ",items)
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
              console.log("this is carouselitems", item);
              return (
                <div className={styles.carouselItemConatiner}>
                  <Link href={`/mangas/${item.mal_id}`}>
                    <img
                      src={item.images?.jpg.image_url}
                      alt={`Image of ${item?.title}`}
                      className={styles.img}
                    />
                  </Link>
                  <Link href={`/mangas/${item.mal_id}`}>
                    <h3 className={styles.carouselItemTitle}>{item.title.length<15 ? item.title :item.title.substring(0,15)+"..."}</h3>
                  </Link>
                </div>
              );
            })}
        </Carousel>
      </div>
    );
  

}
export default CarouselComponent;
