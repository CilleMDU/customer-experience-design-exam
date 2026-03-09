import styles from "./ProductDetailPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SizeSelector from "../../components/SizeSelector";
import informationBtn from "../../assets/information-btn.svg"

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
            <div classnName={styles.colors}>
              <p className={styles.colorTitle}>Farver</p>
              <div
                className={styles.colorCircle}
                style={{ background: getColor(product.color) }}
              ></div>
            </div>
            <SizeSelector sizes={product.sizes} onSelect={handleSizeSelect} />
            <p className={styles.description}>{product.description}</p>
            <div className={styles.buttons}>
              <button className={styles.buyButton}>
                Læg i kurv<a href="#"></a>
              </button>
              <div className={styles.serviceAndInformation}>
                {product["single-item-service"] && (
                  <button className={styles.serviceButton}>
                    Single Item Service
                  </button>
                )}
                <img
                  src={informationBtn}
                  alt="informationsknap angående single item service"
                  className={styles.informationBtn}
                />
              </div>
            </div>
            <div className={styles.ratingAndStock}>
              <div className={styles.rating}>
                ⭐ {product.rating?.rate}{" "}
                <a href="#">({product.rating?.count})</a>
              </div>
              <span
                className={`product-stock ${product.stock ? "in-stock" : "out-of-stock"}`}
              >
                {product.stock ? "På lager" : "Udsolgt"}
              </span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}