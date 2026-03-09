import { useState } from "react";
import styles from "./SizeSelector.module.css";

export default function SizeSelector({ sizes, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const handleSelect = (size) => {
    setSelectedSize(size);
    setIsOpen(false);
    onSelect(size);
  };

  return (
    <div className={styles.sizeSelector}>
      <div className={styles.selectorButton} onClick={() => setIsOpen(!isOpen)}>
        {selectedSize || "Vælg størrelse"}
        <span className={styles.arrow}>▼</span>
      </div>
      {isOpen && (
        <div className={styles.sizeOptions}>
          {sizes?.map((sizeObj) => (
            <div
              key={sizeObj.size}
              className={`${styles.sizeOption} ${
                !sizeObj.available ? styles.disabled : ""
              } ${selectedSize === sizeObj.size ? styles.selected : ""}`}
              onClick={() =>
                !sizeObj.available ? null : handleSelect(sizeObj.size)
              }
            >
              {sizeObj.size}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
