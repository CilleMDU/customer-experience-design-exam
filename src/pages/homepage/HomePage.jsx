import heroLogo from "../../assets/logo-hero-section.svg";
import heroBg from "../../assets/hero-section-background.svg";
import etBen from "../../assets/etBen.svg";
import rating from "../../assets/rating.svg";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import Product from "../../components/Product";
import Data from "../../../public/data.json";

export default function HomePage() {
  return (
    <>
      <main>
        <section className={styles.heroSection}>
          <img
            src={heroBg}
            alt="Hero Baggrunds billede"
            className={styles.heroBg}
          />
          <img src={heroLogo} alt="Hero Logo" className={styles.heroLogo} />
          <div className={styles.heroDivider} />
        </section>
        <section className={styles.productShowcase}>
          <InlineProductGrid />{" "}
          {/* <kalder funktion med productgrid med tre cards /> */}
        </section>
        <section className={styles.singleItemService}>
          <div className={styles.serviceText}>
            <h2 className={styles.singleItemServiceTitle}>
              Single Item Service
            </h2>
            <p className={styles.singleItemServiceText}>
              Har du kun brug for et produkt, men de kommer som sæt? Bare rolig,
              med vores single item service kan du aktivt fravælge den del af et
              produktsæt du ikke har brug for. Gør det med dine sko, handsker,
              sokker osv. Vi er her for at hjælpe dig med det du har brug for!
            </p>
          </div>
          <img className={styles.etBen} src={etBen} alt="Et Ben" />
        </section>

        <section className={styles.socialProof}>
          <div className={styles.socialProofCard}>
            <img className={styles.rating} src={rating} alt="Rating" />
            <p className={styles.udtalelese}>
              "Jeg havde kun brug for en sko, men har aldrig kunnet finde en
              side hvor jeg kunne få det før nu."
            </p>
            <p className={styles.navn}>-Anne (22)</p>
          </div>
          <div className={styles.socialProofCard}>
            <img className={styles.rating} src={rating} alt="Rating" />
            <p className={styles.udtalelese}>
              "Elsker at farverne er anderledes end på andre tøj hjemmesider,
              jeg er så træt af sort og blå."
            </p>
            <p className={styles.navn}>-Bolette (40)</p>
          </div>
          <div className={styles.socialProofCard}>
            <img className={styles.rating} src={rating} alt="Rating" />
            <p className={styles.udtalelese}>
              "Jeg var lidt usikker på siden til at starte med fordi den virkede
              så ny, men den er faktisk super fed."
            </p>
            <p className={styles.navn}>-Agnes (28)</p>
          </div>
        </section>
      </main>
    </>
  );
}

function InlineProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(Data);
  }, []);

  return (
    <div className={styles.productShowcaseGrid}>
      {/* tager produkter fra json fil starter fra indeks 0 og slutter FØR indeks 3 */}
      {products.slice(0, 3).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
