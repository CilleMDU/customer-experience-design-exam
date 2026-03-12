import styles from "./FooterBar.module.css";
import facebookIkon from "../assets/facebook-Ikon.svg";
import instagramIkon from "../assets/instagram-Ikon.svg";
import tiktokIkon from "../assets/tiktok-ikon.svg";

export default function FooterBar() {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerIndhold}>
        <div>
          <h2 className={styles.h2}>Om os</h2>
          <p>Om Uniquely Her</p>
          <p>Nyheder</p>
          <p>Inklusion og diversitet</p>
          <p>Tilgængelighed</p>
        </div>

        <div>
          <h2 className={styles.h2}>Hjælp</h2>
          <p>Ofte stillede spørgsmål</p>
          <p>Retur- og fortrydelsesret</p>
          <p>Betaling</p>
          <p>Ordrestatus</p>
          <p>Anmeldelser</p>
        </div>

        <div>
          <h2 className={styles.h2}>Kontakt os</h2>
          <p className={styles.footText}>Mail: Uniquelyher@xxxxx.com</p>
          <p className={styles.footText}>Tlf: +45 51 88 14 17</p>
        </div>

        <div className={styles.follow}>
          <h2 className={styles.h2}>Følg os</h2>
          <div className={styles.ikoner}>
            <p className={styles.footText}>Facebook</p>
            <img src={facebookIkon} alt="Facebook ikon" />
          </div>

          <div className={styles.ikoner}>
            <p className={styles.footText}>Instagram</p>
            <img src={instagramIkon} alt="Instagram ikon" />
          </div>

          <div className={styles.ikoner}>
            <p className={styles.footText}>TikTok</p>
            <img src={tiktokIkon} alt="TikTok ikon" />
          </div>
        </div>
      </section>

      <div className={styles.copyright}>
        <p className={styles.footText}>
          &copy; 2026 Uniquely Her. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
