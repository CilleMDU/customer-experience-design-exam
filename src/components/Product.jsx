import { Link } from "react-router";
import styles from "./product.module.css";

export default function product({ product }) {
  return (
    <Link to={`/products/${product.id}`} className={styles.cardLink}>
      <article className={styles.card}>
        <img src={product.image} className={styles.image} />
        <div className={styles.info}>
          <h2 className={styles.title}>{product.title}</h2>
          <p className={styles.price}>DKK {product.price}</p>
          <span
            className={`${styles.stock} ${product.inStock ? styles.inStock : styles.outOfStock}`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </article>
    </Link>
  );
}
