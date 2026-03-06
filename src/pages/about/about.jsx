import styles from "./about.module.css";
import heroLogo from "../../assets/logo-hero-section.svg";
export default function About() {
  return (
    <>
      <main>
        <div>
          <h2>Uniquely Her som brand</h2>
          <p>
            Uniquely Her stræber efter at inkluderer og omfavne kvinder i alle
            de former og farver de kommer i. Træningstøj skal være noget kvinder
            kan bruge når de vil svede, gøre rent, slappe af eller som et
            værktøj der gør hverdagen nemmere at forholde sig til. Vores brand
            baserer sig på kropspositivitet, friske elementer og at hverdagen er
            den vi lever størstedelen af vores liv i. Vores site skal både være
            et sted man kan shoppe, men også et sted man kan føle sig set.
            Træningstøj er lige så meget til atleter, som til hverdagsheltene
            der løber hurtigt for at nå karrieren, familielivet eller jagter
            komfort gennem fleksibelt og åndbart materiale. Vi er et brand lavet
            til kvinder, som de er
          </p>
        </div>
        <img className={styles.heroLogo} src={heroLogo} alt="logo" />
      </main>
    </>
  );
}
