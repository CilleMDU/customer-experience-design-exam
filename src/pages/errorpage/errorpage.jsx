import styles from "./errorpage.module.css";
export default function ErrorPage() {
  return (
    <>
      <header>
        <h2 className={styles.h2}>404 - Error</h2>
      </header>
      <main className={styles.main}>
        <h3 className={styles.h3}>Åh nej... denne side findes ikke</h3>
        <p className={styles.p}>
          Klik på logoet, så kommer du tilbage til startsiden igen, fortsat god
          shopping!
        </p>
      </main>
    </>
  );
}
