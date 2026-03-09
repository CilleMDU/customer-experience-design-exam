import styles from "./ProductDetailPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SizeSelector from "../../components/SizeSelector";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      const url = "../../public/data.json";
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

  const handleSizeSelect = (size) => {
    console.log("Selected size:", size);
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
            <h4 className={styles.brand}>{product.brand}</h4>
            <h2 className={styles.title}>{product.title}</h2>
            <p className={styles.price}>{product.price}</p>
            <SizeSelector sizes={product.sizes} onSelect={handleSizeSelect} />
            <p className="product-description-detail">{product.description}</p>
            <button className={styles.buyButton}>
              Læg i kurv<a href="#"></a>
            </button>
            {product["single-item-service"] && (
              <button className={styles.serviceButton}>
                Single Item Service
              </button>
            )}
            <p className="product-rating-detail">
              ⭐ {product.rating?.rate}{" "}
              <a href="#">({product.rating?.count})</a>
              <span
                className={`product-stock ${product.stock ? "in-stock" : "out-of-stock"}`}
              >
                {product.stock ? "På lager" : "Udsolgt"}
              </span>
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
