import styles from "./ProductDetailPage.module.css";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import SizeSelector from "../../components/SizeSelector";
import SISPopUp from "../../components/SISPopUp";
import SpecialBuy from "../../components/SpecialBuy";
import informationBtn from "../../assets/information-btn-hover.svg";
import starIcon from "../../assets/star.svg";
import touchIcon from "../../assets/touch-approved-badge.svg";
import truckIcon from "../../assets/truck.svg";
import packageIcon from "../../assets/package.svg";
import { ToastContainer, toast } from "react-toastify";
import toastIcon from "../../assets/added-to-cart.svg";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [materialOpen, setMaterialOpen] = useState(false);
  const [careOpen, setCareOpen] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [specialBuyOpen, setSpecialBuyOpen] = useState(false);
  const [sisPopUpOpen, setSISPopUpOpen] = useState(false);
  const buyNotify = () => {
    toast(
      <div className={styles.toastContent}>
        <img
          src={toastIcon}
          alt="tilføjet til kurven"
          className={styles.toasterImg}
        />
      </div>,
      {
        position: "top-right",
        autoClose: 5000,
        closeButton: false,
        hideProgressBar: true,
      },
    );
  };

  function toggleFavorite() {
    setIsFavorited(!isFavorited);
  }

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

  const handleThumbnailKeyDown = (e, index) => {
    if (e.key === "ArrowRight" && index < product.gallery?.length - 1) {
      setCurrentImageIndex(index + 1);
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && index > 0) {
      setCurrentImageIndex(index - 1);
      e.preventDefault();
    } else if (e.key === "Enter" || e.key === " ") {
      setCurrentImageIndex(index);
      e.preventDefault();
    }
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

  function getStockColor(stock) {
    if (stock === true) {
      return "#00AC06";
    } else if (stock === false) {
      return "#FF5900";
    }
  }

  return (
    <>
      <main>
        <section className={styles.cards}>
          <div className={styles.gallery}>
            <div
              className={styles.thumbnails}
              role="group"
              aria-label="Produktbilleder"
            >
              {product.gallery?.map((image, index) => (
                <button
                  key={index}
                  src={image.image_url}
                  className={`${styles.thumbnail} ${
                    index === currentImageIndex ? styles.active : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  onKeyDown={(e) => handleThumbnailKeyDown(e, index)}
                  aria-label={`Billede ${index + 1} af ${product.gallery?.length}`}
                  aria-pressed={index === currentImageIndex}
                  aria-controls="main-product-image"
                >
                  <img src={image.image_url} alt="" aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className={styles.mainImageContainer}>
              <img
                id="main-product-image"
                src={product.gallery?.[currentImageIndex]?.image_url}
                alt={
                  product.gallery?.[currentImageIndex]?.alt_text ||
                  `${product.title}`
                }
                className={styles.image}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div>
              {product["touch-approved"] && (
                <img
                  src={touchIcon}
                  alt="touch approved"
                  className={styles.touchIcon}
                />
              )}
            </div>
            <h4 className={styles.brand}>{product.brand}</h4>
            <h2 className={styles.title}>{product.title}</h2>
            <p>
              {product.discounts && product.discounts[0]?.discount ? (
                <>
                <span className={styles.price}>{product.discounts[0].discountPrice || product.price}</span>
                <span className={styles.originalPrice}>{product.price}</span>
                </>
                ) : (
                <span className={styles.price}>{product.price}</span>
                )}
                </p>
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
              <div className={styles.buyAndFave}>
                <button onClick={buyNotify} className={styles.buyButton}>
                  Læg i kurv
                </button>
                <ToastContainer toastClassName={styles.toastContainer} />
                <button
                  className={styles.like}
                  aria-label={
                    isFavorited
                      ? "Fjern fra favoritter"
                      : "Tilføj til favoritter"
                  }
                  aria-pressed={isFavorited}
                  onClick={toggleFavorite}
                >
                  <span
                    className={`${styles.heart} ${
                      isFavorited ? styles.activeHeart : styles.inactiveHeart
                    }`}
                  ></span>
                </button>
              </div>
              <div className={styles.serviceAndInformation}>
                {product["single-item-service"] && (
                  <button
                    onClick={() => setSpecialBuyOpen(true)}
                    className={styles.serviceButton}
                  >
                    Single Item Service
                  </button>
                )}
                {product["single-item-service"] && (
                  <button
                    onClick={() => setSISPopUpOpen(true)}
                    className={styles.informationBtnWrapper}
                    aria-label="Information om Single Item Service"
                  >
                    <img
                      src={informationBtn}
                      alt=""
                      aria-hidden="true"
                      className={styles.informationBtn}
                    />
                  </button>
                )}
              </div>
            </div>
            <div className={styles.ratingAndStock}>
              <div className={styles.rating}>
                <img
                  src={starIcon}
                  alt=""
                  aria-hidden="true"
                  className={styles.star}
                />
                <div className={styles.rate}>{product.rating?.rate} </div>
                <a
                  href="../errorpage/errorpage"
                  aria-label={`${product.rating?.count} anmeldelser`}
                >
                  ({product.rating?.count})
                </a>
              </div>
              <div className={styles.stock}>
                <div
                  className={styles.stockCircle}
                  style={{ background: getStockColor(product.stock) }}
                ></div>
                <span
                  className={`product-stock ${product.stock ? "in-stock" : "out-of-stock"}`}
                >
                  {product.stock ? "På lager" : "Udsolgt"}
                </span>
              </div>
              <div className={styles.return}>
                <img src={packageIcon} alt="pakke ikon" />
                <p>100 dages returret</p>
              </div>
              <div className={styles.minReturn}>
                <img src={truckIcon} alt="lastbils ikon" />
                <p>Gratis retur ved køb over 399kr</p>
              </div>
            </div>
            <div className={styles.careAndMaterials}>
              <div className={styles.careAndMate}>
                <button
                  className={styles.careAndMateDrop}
                  onClick={() => setMaterialOpen(!materialOpen)}
                  aria-expanded={materialOpen}
                  aria-controls="material-content"
                >
                  <span>Materiale</span>
                  <span
                    className={
                      materialOpen ? styles.iconOpen : styles.iconClosed
                    }
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {materialOpen && (
                  <div
                    className={styles.careAndMateContent}
                    id="material-content"
                  >
                    <p>{product.material}</p>
                  </div>
                )}
              </div>
              <div className={styles.careAndMate}>
                <button
                  className={styles.careAndMateDrop}
                  onClick={() => setCareOpen(!careOpen)}
                  aria-expanded={careOpen}
                  aria-controls="care-content"
                >
                  <span>Pleje</span>
                  <span
                    className={careOpen ? styles.iconOpen : styles.iconClosed}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                {careOpen && (
                  <div className={styles.careAndMateContent} id="care-content">
                    <p>{product.care}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SpecialBuy
        isOpen={specialBuyOpen}
        onClose={() => setSpecialBuyOpen(false)}
      />
      <SISPopUp isOpen={sisPopUpOpen} onClose={() => setSISPopUpOpen(false)} />
    </>
  );
}
