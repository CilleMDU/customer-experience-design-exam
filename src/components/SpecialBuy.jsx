import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styles from "./SpecialBuy.module.css";
import closeBtn from "../assets/closebtn.svg";
import SizeSelector from "./SizeSelector";
import { ToastContainer, toast } from "react-toastify";
import toastIcon from "../assets/added-to-cart.svg";

export default function SpecialBuy({ isOpen, onClose }) {
  const params = useParams();
  const productId = Number(params.id);
  const [product, setProduct] = useState({});
  const [selectedSide, setSelectedSide] = useState(null);
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
  

  useEffect(() => {
    async function fetchProducts() {
      const url = "../../public/data.json";
      const response = await fetch(url);        
      const products = await response.json();
     console.log(products);

       const productToDisplay = products.find((p) => p.id === productId);
      console.log(productToDisplay);
      setProduct(productToDisplay);
    }
     fetchProducts();
   }, [productId]);

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

  if (!isOpen) return null;
  
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleAndClose}>
          <h2 className={styles.title}>Single Item Service</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={closeBtn} alt="Close popup" />
          </button>
        </div>
        <p className={styles.text}>
          Ikke alle er bygget ens. Hos Uniquely Her er vores mål at gøre plads
          til alle. Derfor har vi valgt at give dem, der ikke er som alle andre
          de bedste muligheder, så vi får alle med.
        </p>
        <h3 className={styles.orderTitle}>Bestilling</h3>
        <div className={styles.order}>
          <div className={styles.colors}>
            <p className={styles.underTitle}>Farver:</p>
            <div
              className={styles.colorCircle}
              style={{ background: getColor(product.color) }}
            ></div>
          </div>
          <div className={styles.size}>
            <p className={styles.underTitle}>Størrelse:</p>
            <SizeSelector sizes={product.sizes} onSelect={handleSizeSelect} />
          </div>
          <div className={styles.sides}>
            <p className={styles.underTitle}>Side:</p>
            <div className={styles.circleToggle}>
              <div
                className={styles.option}
                onClick={() => setSelectedSide("left")}
              >
                <span className={styles.label}>Venstre</span>
                <div
                  className={`${styles.circle} ${selectedSide === "left" ? styles.selected : ""}`}
                ></div>
              </div>
              <div
                className={styles.option}
                onClick={() => setSelectedSide("right")}
              >
                <span className={styles.label}>Højre</span>
                <div
                  className={`${styles.circle} ${selectedSide === "right" ? styles.selected : ""}`}
                ></div>
              </div>
            </div>
          </div>
          <div className={styles.basket}>
            <button onClick={buyNotify} className={styles.buyButton}>
              Læg i kurv
            </button>
            <ToastContainer toastClassName={styles.toastContainer} />
          </div>
        </div>
      </div>
    </div>
  );
}
