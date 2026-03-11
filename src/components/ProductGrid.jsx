import styles from "./ProductGrid.module.css";
import { useEffect, useState } from "react";
import Product from "./Product";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState("none");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedColor, setSelectedColor] = useState("all");
  const [selectedSize, setSelectedSize] = useState("all");
  const [touchApprovedOnly, setTouchApprovedOnly] = useState(false);
  const [openSection, setOpenSection] = useState({
    sizes: false,
    brands: false,
    colors: false,
    price: true,
  });

  function toggleSection(section) {
    setOpenSection((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("../public/data.json");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  // Finder alle unikke brands (f.eks. Nike, Adidas, Puma)
  const brands = [...new Set(products.map((product) => product.brand))].sort();

  // Finder alle unikke farver (f.eks. Red, Blue, Green)
  const colors = [...new Set(products.map((product) => product.color))].sort();

  // Finder alle unikke størrelser
  const sizes = [
    ...new Set(
      products.flatMap((product) =>
        product.sizes
          ?.filter((s) => typeof s.size === "number")
          .map((s) => s.size),
      ),
    ),
  ].sort((a, b) => a - b);

  const filteredProducts = products.filter((product) => {
    const matchesSelectedCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesStockFilter =
      inStockOnly === false || product.inStock === true;
    const matchesTouchApprovedFilter =
      touchApprovedOnly === false || product["touch-approved"] === true;
    const matchesSelectedSize =
      selectedSize === "all" ||
      product.sizes?.some(
        (s) => s.size === Number(selectedSize) && s.available,
      );
    const matchesSelectedBrand =
      selectedBrand === "all" || product.brand === selectedBrand;
    const matchesSelectedColor =
      selectedColor === "all" || product.color === selectedColor;
    return (
      matchesSelectedCategory &&
      matchesStockFilter &&
      matchesTouchApprovedFilter &&
      matchesSelectedSize &&
      matchesSelectedBrand &&
      matchesSelectedColor
    );
  });

  // Create a copy for sorting to avoid mutating the original array
  const sortedProducts = [...filteredProducts];

  // Helper function to parse price string to number
  const parsePrice = (priceString) => {
    if (typeof priceString === "string") {
      return parseFloat(priceString.replace(/[^\d.,]/g, "").replace(",", "."));
    }
    return parseFloat(priceString) || 0;
  };

  if (sortBy === "price-asc") {
    sortedProducts.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
  } else if (sortBy === "price-desc") {
    sortedProducts.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
  } else if (sortBy === "rating-desc") {
    sortedProducts.sort(
      (a, b) => (b.rating?.rate ?? 0) - (a.rating?.rate ?? 0),
    );
  }

  // Get the current sort label for display
  const getSortLabel = () => {
    switch (sortBy) {
      case "price-asc":
        return "Pris: Laveste først";
      case "price-desc":
        return "Pris: Højeste først";
      case "rating-desc":
        return "Bedste rating";
      default:
        return "Sorter efter";
    }
  };

  function resetFilters() {
    setSelectedCategory("all");
    setSelectedBrand("all");
    setSelectedColor("all");
    setSelectedSize("all");
    setInStockOnly(false);
    setTouchApprovedOnly(false);
    setSortBy("none");
  }

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
      <div className={styles.productPageHeader}>
        <p className={styles.resultCount}>
          {sortedProducts.length} produkter fundet
        </p>
        <div className={styles.productManagement}>
          <div></div>
          <div className={styles.sortContainer}>
            <button
              className={styles.sortButton}
              aria-label="Sorter produkter"
              onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
              aria-expanded={isSortMenuOpen}
              aria-controls="sort-menu"
            >
              <p>{getSortLabel()}</p>
              <div className={styles.sortIcon}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  aria-hidden="true"
                >
                  <line
                    y1="-0.5"
                    x2="8.48528"
                    y2="-0.5"
                    transform="matrix(-0.707107 0.707107 0.707107 0.707107 12 0.707031)"
                    stroke="#151515"
                  />
                  <line
                    x1="0.353553"
                    y1="0.353478"
                    x2="6.35355"
                    y2="6.35348"
                    stroke="#151515"
                  />
                </svg>
              </div>
            </button>
            {isSortMenuOpen && (
              <div
                className={styles.sortMenu}
                id="sort-menu"
                role="listbox"
                aria-label="Sorteringsmuligheder"
              >
                <button
                  type="button"
                  className={`${styles.sortOption} ${sortBy === "price-asc" ? styles.activeSortOption : ""}`}
                  onClick={() => {
                    setSortBy("price-asc");
                    setIsSortMenuOpen(false);
                  }}
                  role="option"
                  aria-selected={sortBy === "price-asc"}
                >
                  Pris: Laveste først
                </button>
                <button
                  type="button"
                  className={`${styles.sortOption} ${sortBy === "price-desc" ? styles.activeSortOption : ""}`}
                  onClick={() => {
                    setSortBy("price-desc");
                    setIsSortMenuOpen(false);
                  }}
                  role="option"
                  aria-selected={sortBy === "price-desc"}
                >
                  Pris: Højeste først
                </button>
                <button
                  type="button"
                  className={`${styles.sortOption} ${sortBy === "rating-desc" ? styles.activeSortOption : ""}`}
                  onClick={() => {
                    setSortBy("rating-desc");
                    setIsSortMenuOpen(false);
                  }}
                  role="option"
                  aria-selected={sortBy === "rating-desc"}
                >
                  Bedste rating
                </button>
              </div>
            )}
          </div>
          <button
            className={styles.filterButton}
            type="button"
            onClick={() => setIsFilterMenuOpen(true)}
            aria-label="Åbn filtreringspanel"
          >
            <p>Filtrering</p>
            <div className={styles.filterIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M14.1663 7.9996H5.92967M3.02234 7.9996H1.83301M3.02234 7.9996C3.02234 7.61415 3.17546 7.24449 3.44801 6.97194C3.72057 6.69939 4.09023 6.54627 4.47567 6.54627C4.86112 6.54627 5.23078 6.69939 5.50334 6.97194C5.77589 7.24449 5.92901 7.61415 5.92901 7.9996C5.92901 8.38505 5.77589 8.75471 5.50334 9.02726C5.23078 9.29982 4.86112 9.45294 4.47567 9.45294C4.09023 9.45294 3.72057 9.29982 3.44801 9.02726C3.17546 8.75471 3.02234 8.38505 3.02234 7.9996ZM14.1663 12.4043H10.3343M10.3343 12.4043C10.3343 12.7898 10.1809 13.1599 9.90824 13.4325C9.63562 13.7051 9.26588 13.8583 8.88034 13.8583C8.49489 13.8583 8.12523 13.7045 7.85268 13.4319C7.58013 13.1594 7.42701 12.7897 7.42701 12.4043M10.3343 12.4043C10.3343 12.0187 10.1809 11.6493 9.90824 11.3767C9.63562 11.1041 9.26588 10.9509 8.88034 10.9509C8.49489 10.9509 8.12523 11.1041 7.85268 11.3766C7.58013 11.6492 7.42701 12.0188 7.42701 12.4043M7.42701 12.4043H1.83301M14.1663 3.59493H12.0963M9.18901 3.59493H1.83301M9.18901 3.59493C9.18901 3.20949 9.34213 2.83983 9.61468 2.56727C9.88723 2.29472 10.2569 2.1416 10.6423 2.1416C10.8332 2.1416 11.0222 2.17919 11.1985 2.25223C11.3748 2.32527 11.535 2.43232 11.67 2.56727C11.805 2.70223 11.912 2.86244 11.985 3.03877C12.0581 3.21509 12.0957 3.40408 12.0957 3.59493C12.0957 3.78579 12.0581 3.97478 11.985 4.1511C11.912 4.32743 11.805 4.48764 11.67 4.6226C11.535 4.75755 11.3748 4.8646 11.1985 4.93764C11.0222 5.01068 10.8332 5.04827 10.6423 5.04827C10.2569 5.04827 9.88723 4.89515 9.61468 4.6226C9.34213 4.35004 9.18901 3.98038 9.18901 3.59493Z"
                  stroke="#151515"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <button
        className={`${styles.overlay} ${isFilterMenuOpen ? styles.overlayVisible : ""}`}
        type="button"
        onClick={() => setIsFilterMenuOpen(false)}
      ></button>

      <aside
        id="filter-drawer"
        className={`${styles.drawer} ${isFilterMenuOpen ? styles.drawerOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-drawer-title"
      >
        <div className={styles.drawerHeader}>
          <h2 id="filter-drawer-title">Filtrer</h2>
          <button
            type="button"
            className={styles.closeFilterButton}
            onClick={() => setIsFilterMenuOpen(false)}
            aria-label="Luk filtreringspanel"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 9.70342L2.03802 15.6654C1.81496 15.8885 1.53105 16 1.18631 16C0.841571 16 0.557667 15.8885 0.3346 15.6654C0.111533 15.4423 0 15.1584 0 14.8137C0 14.4689 0.111533 14.185 0.3346 13.962L6.29658 8L0.3346 2.03802C0.111533 1.81496 0 1.53105 0 1.18631C0 0.841571 0.111533 0.557667 0.3346 0.3346C0.557667 0.111533 0.841571 0 1.18631 0C1.53105 0 1.81496 0.111533 2.03802 0.3346L8 6.29658L13.962 0.3346C14.185 0.111533 14.4689 0 14.8137 0C15.1584 0 15.4423 0.111533 15.6654 0.3346C15.8885 0.557667 16 0.841571 16 1.18631C16 1.53105 15.8885 1.81496 15.6654 2.03802L9.70342 8L15.6654 13.962C15.8885 14.185 16 14.4689 16 14.8137C16 15.1584 15.8885 15.4423 15.6654 15.6654C15.4423 15.8885 15.1584 16 14.8137 16C14.4689 16 14.185 15.8885 13.962 15.6654L8 9.70342Z"
                fill="#151515"
              />
            </svg>
          </button>
        </div>
        <div className={styles.priceFilterSection}></div>

        <div className={styles.filterSection}>
          <button
            className={styles.filterHeader}
            onClick={() => toggleSection("sizes")}
            aria-expanded={openSection.sizes}
            aria-controls="sizes-filter-content"
          >
            <span>Størrelse</span>

            <svg
              className={`${styles.chevron} ${
                openSection.sizes ? styles.chevronOpen : ""
              }`}
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="11.6464"
                y1="6.35355"
                x2="5.64645"
                y2="0.353553"
                stroke="#151515"
              />
              <line
                y1="-0.5"
                x2="8.48528"
                y2="-0.5"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 6)"
                stroke="#151515"
              />
            </svg>
          </button>

          {openSection.sizes && (
            <div
              className={styles.sizesFilterSection}
              id="sizes-filter-content"
              role="group"
              aria-label="Størrelse filter"
            >
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={`${styles.sizeButton} ${selectedSize === size ? styles.activeSizeButton : ""}`}
                  onClick={() =>
                    setSelectedSize(selectedSize === size ? "all" : size)
                  }
                  aria-pressed={selectedSize === size}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.filterSection}>
          <button
            className={styles.filterHeader}
            onClick={() => toggleSection("brands")}
            aria-expanded={openSection.brands}
            aria-controls="brands-filter-content"
          >
            <span>Mærke</span>

            <svg
              className={`${styles.chevron} ${
                openSection.brands ? styles.chevronOpen : ""
              }`}
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="11.6464"
                y1="6.35355"
                x2="5.64645"
                y2="0.353553"
                stroke="#151515"
              />
              <line
                y1="-0.5"
                x2="8.48528"
                y2="-0.5"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 6)"
                stroke="#151515"
              />
            </svg>
          </button>

          {openSection.brands && (
            <div
              className={styles.brandsFilterSection}
              id="brands-filter-content"
              role="group"
              aria-label="Mærke filter"
            >
              {brands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  className={`${styles.brandButton} ${selectedBrand === brand ? styles.activeBrandButton : ""}`}
                  onClick={() =>
                    setSelectedBrand(selectedBrand === brand ? "all" : brand)
                  }
                  aria-pressed={selectedBrand === brand}
                >
                  {brand}
                  <div className={styles.flowerCheckbox}>
                    <img
                      className={`${styles.flower} ${selectedBrand === brand ? styles.activeFlowerCheckbox : ""}`}
                      src="../src/assets/flower-pink.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.filterSection}>
          <button
            className={styles.filterHeader}
            onClick={() => toggleSection("colors")}
            aria-expanded={openSection.colors}
            aria-controls="colors-filter-content"
          >
            <span>Farve</span>

            <svg
              className={`${styles.chevron} ${
                openSection.colors ? styles.chevronOpen : ""
              }`}
              width="12"
              height="7"
              viewBox="0 0 12 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <line
                x1="11.6464"
                y1="6.35355"
                x2="5.64645"
                y2="0.353553"
                stroke="#151515"
              />
              <line
                y1="-0.5"
                x2="8.48528"
                y2="-0.5"
                transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 0 6)"
                stroke="#151515"
              />
            </svg>
          </button>

          {openSection.colors && (
            <div
              className={styles.colorsFilterSection}
              id="colors-filter-content"
              role="group"
              aria-label="Farve filter"
            >
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorButton} ${selectedColor === color ? styles.activecolorButton : ""}`}
                  onClick={() =>
                    setSelectedColor(selectedColor === color ? "all" : color)
                  }
                  aria-pressed={selectedColor === color}
                >
                  <div className={styles.color}>
                    <div
                      className={styles.colorCircle}
                      style={{ background: getColor(color) }}
                      aria-hidden="true"
                    ></div>
                    {color}
                  </div>
                  <div className={styles.flowerCheckbox}>
                    <img
                      className={`${styles.flower} ${selectedColor === color ? styles.activeFlowerCheckbox : ""}`}
                      src="../src/assets/flower-pink.svg"
                      alt=""
                      aria-hidden="true"
                    />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className={styles.touchApprovedSection}>
          <label
            className={styles.touchApprovedArea}
            htmlFor="touch-approved-filter"
          >
            <input
              id="touch-approved-filter"
              type="checkbox"
              checked={touchApprovedOnly}
              onChange={(event) => setTouchApprovedOnly(event.target.checked)}
              aria-label="Vis kun Touch Approved produkter"
            />
            Touch Approved
          </label>
        </div>

        <div className={styles.showOrRemove}>
          <button
            type="button"
            className={styles.resetButton}
            onClick={resetFilters}
          >
            Ryd filtrer
          </button>
          <button
            type="button"
            className={styles.showAllButton}
            onClick={() => setIsFilterMenuOpen(false)}
          >
            Vis alle
          </button>
        </div>
      </aside>

      <section className={styles.grid} aria-label="Product list">
        {sortedProducts.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </>
  );
}
