import styles from "./errorpage.module.css";
import uterus from "../../assets/uterus.svg";

export default function ErrorPage() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.h1}>Åh nej... denne side findes ikke</h1>
        <div className={styles.div}>
          <p className={styles.p}>
            Klik på logoet, eller tilbageknappen oppe i venstre hjørne, så
            kommer du tilbage til startsiden igen, fortsat god shopping!
          </p>
          <img
            className={styles.uterus}
            src={uterus}
            alt="billede af maskotten uterus, som er en livmoder med en dumbell i den ene ægestok og som former et hjerte med den anden æggestok"
          />
        </div>
      </main>
    </>
  );
}
