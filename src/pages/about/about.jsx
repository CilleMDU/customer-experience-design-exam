import styles from "./about.module.css";
import heroLogo from "../../assets/logo-hero-section.svg";
export default function About() {
  return (
    <>
      <main className={styles.main}>
        <section className={styles.tekst}>
          <h1 className={styles.h1}>Uniquely Her, hvem er vi?</h1>
          <p className={styles.p}>
            Uniquely Her er et brand, der stræber efter at inkludere og omfavne
            kvinder i alle de former og farver de kommer i.
            <br />
            Træningstøj skal være noget kvinderne kan bruge når de vil svede,
            gøre rent, slappe af eller som et værktøj, der gør hverdagen nemmere
            at forholde sig til.
            <br />
            Vores brand baserer sig på kropspositivitet, friske elementer og at
            hverdagen er den vi lever størstedelen af vores liv i. Vores site
            skal både være et sted man kan shoppe, men også et sted man kan føle
            sig set.
            <br />
            Træningstøj er lige så meget til atleter, som til hverdagsheltene
            der løber hurtigt for at nå karrieren, familielivet eller jagter
            komfort gennem fleksibelt og åndbart materiale. Vi er et brand lavet
            til kvinder, lige præcis som de er.
          </p>
        </section>
        <img className={styles.heroLogo} src={heroLogo} alt="logo" />
      </main>
    </>
  );
}
