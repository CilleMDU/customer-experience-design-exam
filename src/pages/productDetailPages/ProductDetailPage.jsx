import styles from "./ProductDetailPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectSize, setSelectSizeIndex] = useState(0);
  const [showAllSizes, setShowAllSizes] = useState(false);

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
      setSelectSizeIndex(0);
    }
    fetchProducts();
  }, [productId]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleSizeClick = (index) => {
    setSelectSizeIndex(index);
    setShowAllSizes(false);
  };

  const currentRow = Math.floor(selectSize / 6);
  const visibleSizes = product.size?.slice(currentRow * 6, (currentRow + 1) * 6) || [];

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
            <div className={styles.size}>
              <p className="product-size-detail">Størrelse</p>
              <div className={styles.sizeButtons}>
                {product.size?.map((sizeObj, index) => {
                  const sizeKey = Object.keys(sizeObj).find(key => key.startsWith('size'));
                  const size = sizeObj[sizeKey];
                  return (
                    <button
                      key={index}
                      className={`${styles.sizeButton} ${
                        index === selectSize ? styles.active : ""
                      }`}
                      onClick={() => handleSizeClick(index)}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
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
