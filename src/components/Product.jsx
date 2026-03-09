import { Link } from "react-router";
import styles from "./product.module.css";
import inactiveHeart from "../assets/inactive-heart.svg";
import activeHeart from "../assets/hjerte-smil.svg";
import { useState } from "react";

function getColor(color) {
  if (color === "Lyserød") {
    return "#FF3FC5";
  } else if (color === "Sort") {
    return "#000";
  } else if (color === "Sort/hvid") {
    return "linear-gradient(90deg, #000 50%, #fff 50%)";
  } else if (color === "Multi") {
    return "conic-gradient(from 180deg at 50% 50%, #00AC06 0deg, #07F 121.15384697914124deg, #DF2FE2 242.30769395828247deg, #9443EA 360deg)";
  } else if (color === "Hvid") {
    return "#ffffff";
  } else if (color === "Blå") {
    return "#0077FF";
  } else if (color === "Orange") {
    return "#FF5900";
  } else if (color === "Grøn") {
    return "#00AC06";
  } else if (color === "Lilla") {
    return "#9444EA";
  } else if (color === "Brun") {
    return "#562b00";
  } else {
    // Hvis farven ikke findes i listen, returneres en neutral grå
    return "#ccc";
  }
}

export default function product({ product }) {
  const [isFavorited, setIsFavorited] = useState(false);

  function toggleFavorite() {
    setIsFavorited(!isFavorited);
  }
  return (
    <div className={styles.cardLink}>
      <article className={styles.card}>
        <figure className={styles.imageArea}>
          <Link to={`/products/${product.id}`}>
            <img
              src={product.gallery?.[0]?.image_url}
              alt={product.gallery?.[0]?.alt_text}
              className={styles.image}
            />
          </Link>
          <button className={styles.favoriteIcon} onClick={toggleFavorite}>
            <img
              src={isFavorited ? activeHeart : inactiveHeart}
              alt="favorit"
            />
          </button>
        </figure>
        <Link to={`/products/${product.id}`}>
          <span className={styles.brandName}>{product.brand}</span>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>{product.price}</p>
          <section className={styles.hoverInfo}>
            <div className={styles.ratingStarsAmount}></div>
            <div className={styles.colorsAmount}>
              <div
                className={styles.colorCircle}
                style={{ background: getColor(product.color) }}
              ></div>
            </div>
          </section>
        </Link>
      </article>
    </div>
  );
}
