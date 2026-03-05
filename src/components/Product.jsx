import { Link } from "react-router";
import styles from "./product.module.css";

export default function product({ product }) {
  return (
    <Link to={`/products/${product.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <figure className={styles.imageArea}>
          <img
            src={product.gallery?.[0]?.image_url}
            alt={product.gallery?.[0]?.alt_text}
            className={styles.image}
          />
        </figure>
        <span className={styles.brandName}>{product.brand}</span>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>{product.price}</p>
        <section className={styles.hoverInfo}>
          <div className={styles.ratingStarsAmount}>stars</div>
          <div className={styles.colorsAmount}>colors</div>
        </section>
      </article>
    </Link>
  );
}
