import styles from "./FooterBar.module.css";
import facebookIkon from "../assets/facebook-Ikon.svg";
import instagramIkon from "../assets/instagram-Ikon.svg";
import tiktokIkon from "../assets/tiktok-ikon.svg";

export default function FooterBar() {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerIndhold}>
        <div>
          <h3 className={styles.h3}>Om os</h3>
          <p>Om Uniquely Her</p>
          <p>Nyheder</p>
          <p>Inklusion og diversitet</p>
          <p>Tilgængelighed</p>
        </div>

        <div>
          <h3 className={styles.h3}>Hjælp</h3>
          <p>Ofte stillede spørgsmål</p>
          <p>Retur- og fortrydelsesret</p>
          <p>Betaling</p>
          <p>Ordrestatus</p>
          <p>Anmeldelser</p>
        </div>

        <div>
          <h3 className={styles.h3}>Kontakt os</h3>
          <p>Mail: Uniquelyher@xxxxx.com</p>
          <p>Tlf: +45 51 88 14 17</p>
        </div>

        <div className={styles.follow}>
          <h3 className={styles.h3}>Følg os</h3>
          <div className={styles.ikoner}>
            <p>Facebook</p>
            <img src={facebookIkon} alt="Facebook ikon" />
          </div>

          <div className={styles.ikoner}>
            <p>Instagram</p>
            <img src={instagramIkon} alt="Instagram ikon" />
          </div>

          <div className={styles.ikoner}>
            <p>TikTok</p>
            <img src={tiktokIkon} alt="TikTok ikon" />
          </div>
        </div>
      </section>

      <div className={styles.copyright}>
        <p>&copy; 2026 Uniquely Her. All rights reserved.</p>
      </div>
    </footer>
  );
}
