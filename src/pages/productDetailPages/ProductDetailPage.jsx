import styles from "./ProductDetailPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});

  useEffect(() => {
    async function fetchProducts() {
      const url =
        "https://raw.githubusercontent.com/cederdorff/race/refs/heads/master/data/webshop/products.json";
      const response = await fetch(url);
      const products = await response.json();
      console.log(products);

      const productToDisplay = products.find((p) => p.id === productId);
      console.log(productToDisplay);
      setProduct(productToDisplay);
    }
    fetchProducts();
  }, [productId]);

  return (
    <>
      <header>
        <h1>{product.title}</h1>
        <h2>{product.category}</h2>
      </header>
      <main>
        <section className={styles.cards}>
          <img
            src={product.image}
            alt={product.title}
            className={styles.image}
          />
          <div className={styles.info}>
            <h4 className="product-category-detail">{product.category}</h4>
            <h2 className="product-title-detail">{product.title}</h2>
            <p className="product-rating-detail">
              ⭐ {product.rating?.rate}/5{" "}
              <a href="#">({product.rating?.count})</a>
            </p>
            <p className="product-description-detail">{product.description}</p>
            <p className="product-price-detail">DKK {product.price}</p>
            <span
              className={`product-stock ${product.inStock ? "in-stock" : "out-of-stock"}`}
            >
              {product.inStock ? "På lager" : "Udsolgt"}
            </span>
            <button className={styles.button}>
              Læg i kurv<a href="#"></a>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
