import { useState, useRef, useEffect } from "react";
import styles from "./SizeSelector.module.css";

export default function SizeSelector({ sizes, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const buttonRef = useRef(null);
  const optionsRef = useRef(null);

  const handleSelect = (size) => {
    setSelectedSize(size);
    setIsOpen(false);
    onSelect(size);
    buttonRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (
      !isOpen &&
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
    ) {
      e.preventDefault();
      setIsOpen(true);
      setHighlightedIndex(0);
      return;
    }

    if (isOpen) {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < sizes.length - 1 ? prev + 1 : prev,
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (highlightedIndex >= 0 && sizes[highlightedIndex].available) {
            handleSelect(sizes[highlightedIndex].size);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          buttonRef.current?.focus();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && optionsRef.current) {
      const highlightedElement = optionsRef.current.children[highlightedIndex];
      highlightedElement?.scrollIntoView({ block: "nearest" });
    }
  }, [highlightedIndex, isOpen]);

  return (
    <div className={styles.sizeSelector}>
      <button
        ref={buttonRef}
        className={styles.selectorButton}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Vælg størrelse"
      >
        {selectedSize || "Vælg størrelse"}
        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </button>
      {isOpen && (
        <div
          ref={optionsRef}
          className={styles.sizeOptions}
          role="listbox"
          aria-label="Størrelse muligheder"
        >
          {sizes?.map((sizeObj, index) => (
            <div
              key={sizeObj.size}
              className={`${styles.sizeOption} ${
                !sizeObj.available ? styles.disabled : ""
              } ${selectedSize === sizeObj.size ? styles.selected : ""} ${
                highlightedIndex === index ? styles.highlighted : ""
              }`}
              onClick={() =>
                !sizeObj.available ? null : handleSelect(sizeObj.size)
              }
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={selectedSize === sizeObj.size}
              aria-disabled={!sizeObj.available}
            >
              {sizeObj.size}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
