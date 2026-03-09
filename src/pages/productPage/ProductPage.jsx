import FooterBar from "../../components/FooterBar";
import ProductGrid from "../../components/productGrid";
import { ProductManagement } from "../../components/ProductManagement";
import style from "./ProductPage.module.css";

export default function ProductPage() {
  return (
    <>
      <header className={style.header}>
        <ProductManagement />
      </header>
      <main>
        <ProductGrid />
      </main>
    </>
  );
}
