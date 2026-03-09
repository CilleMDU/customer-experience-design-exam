import styles from "./ProductDetailPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const url =
        "../../public/data.json";
      const response = await fetch(url);
      const products = await response.json();
      console.log(products);

      const productToDisplay = products.find((p) => p.id === productId);
      console.log(productToDisplay);
      setProduct(productToDisplay);
      setCurrentImageIndex(0);
    }
    fetchProducts();
  }, [productId]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <main>
        <section className={styles.cards}>
          <div className={styles.gallery}>
            <div className={styles.thumbnails}>
              {product.gallery?.map((image, index) => (
                <img
                  key={index}
                  src={image.image_url}
                  alt={image.alt_text}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.active : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
            <div className={styles.mainImageContainer}>
              <img
                src={product.gallery?.[currentImageIndex]?.image_url}
                alt={product.gallery?.[currentImageIndex]?.alt_text}
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.info}>
            <h4 className="product-brand-detail">{product.brand}</h4>
            <h2 className="product-title-detail">{product.title}</h2>
            <p className="product-price-detail">{product.price}</p>
            <p className="product-rating-detail">
              ⭐ {product.rating?.rate}{" "}
              <a href="#">({product.rating?.count})</a>
            </p>
            <p className="product-description-detail">{product.description}</p>
            <span
              className={`product-stock ${product.stock ? "in-stock" : "out-of-stock"}`}
            >
              {product.stock ? "På lager" : "Udsolgt"}
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
