import heroLogo from "../../assets/logo-hero-section.svg";
import heroBg from "../../assets/hero-section-background.svg";
import etBen from "../../assets/etben.svg";
import uterus from "../../assets/uterus1.svg";
import rating from "../../assets/rating.svg";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";
import Product from "../../components/Product";

export default function HomePage() {
  return (
    <>
      <header>
        <section className={styles.heroSection}>
          <img src={heroBg} alt="Hero Background" className={styles.heroBg} />
          <img src={heroLogo} alt="Hero Logo" className={styles.heroLogo} />
          <div className={styles.heroDivider} />
        </section>
      </header>
      <main>
        <section className={styles.productShowcase}>
          <InlineProductGrid />
        </section>
        <section className={styles.singleItemService}>
          <div className={styles.serviceText}>
            <h1 className={styles.singleItemServiceTitle}>
              Single Item Service
            </h1>
            <p className={styles.singleItemServiceText}>
              Har du kun brug for et produkt, men de kommer som sæt? Bare rolig,
              med vores single item service kan du aktivt fravælge den del af et
              produktsæt du ikke har brug for. Gør det med dine sko, handsker,
              sokker osv. Vi er her for at hjælpe dig med det du har brug for!
            </p>
          </div>
          <img className={styles.uterus} src={uterus} alt="Uterus" />
          <img className={styles.etBen} src={etBen} alt="Et Ben" />
        </section>
        <section className={styles.socialProof}>
          <div className={styles.socialProofCard}>
            <img className={styles.rating1} src={rating} alt="Rating" />
            <p className={styles.udtalelese1}>
              "Jeg havde kun brug for en sko, men har aldrig kunnet finde en
              side hvor jeg kunne få det før nu, jeg føler mig set"
            </p>
            <p className={styles.navn1}>-Anne(22)</p>
          </div>
          <div className={styles.socialProofCard}>
            <img className={styles.rating2} src={rating} alt="Rating" />
            <p className={styles.udtalelese2}>
              "Elsker at farverne er anderledes end på andre tøj hjemmesider,
              jeg er så træt af sort og blå"
            </p>
            <p className={styles.navn2}>-Bolette(40)</p>
          </div>
          <div className={styles.socialProofCard}>
            <img className={styles.rating3} src={rating} alt="Rating" />
            <p className={styles.udtalelese3}>
              "Jeg var lidt usikker på siden til at starte med fordi den virkede
              så ny, men den er faktisk super fed"
            </p>
            <p className={styles.navn3}>-Agnes(28)</p>
          </div>
        </section>
      </main>
    </>
  );
}

function InlineProductGrid() {
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
    <div className={styles.productShowcaseGrid}>
      {products.slice(0, 3).map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}
