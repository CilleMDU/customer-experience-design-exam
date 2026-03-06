import styles from "./ProductGrid.module.css";
import { useEffect, useState } from "react";
import Product from "./product";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch("../public/data.json");
      const data = await response.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <section className={styles.grid}>
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </section>
  );
}
