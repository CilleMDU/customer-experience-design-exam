import heroLogo from "../../assets/logo-hero-section.svg";
import heroBg from "../../assets/hero-section-background.svg";
import etBen from "../../assets/etben.svg";
import styles from "./HomePage.module.css";

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
        <section>. . . .</section>
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
          <img className={styles.etBen} src={etBen} alt="Et Ben" />
        </section>
      </main>
    </>
  );
}
