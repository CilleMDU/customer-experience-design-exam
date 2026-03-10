import React from "react";
import styles from "./SISPopUp.module.css";
import closeBtn from "../assets/closebtn.svg";

export default function SISPopUp({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <div className={styles.titleAndClose}>
          <h2 className={styles.title}>Single Item Service</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <img src={closeBtn} alt="Close popup" />
          </button>
        </div>
        <p className={styles.text}>
          Vi er ikke alle bygget ens og det er ikke alle der har brug for to sko
          eller to handsker, derfor giver Uniquely Her dig muligheden for, at
          købe diverse produkter enkeltvis i stedet for som sæt til halvpris +
          fragt.
          <br />
          Den eneste forskel er at emballagen vil blive vores special designet
          emballage skabt til præcist dette formål. Samme retur police gælder
          stadigvæk.
          <br />
          <br />
          Det eneste du skal gøre er at klikke på Special Bestillinger, her er
          muligheden for at bestille enkeltvise produkter i stedet for sæt.
          <br />
          Skal du kun bruge en sko? Klik på knappen og fortæl os hvilken du skal
          bruge! Vi sørger for resten!
        </p>
      </div>
    </div>
  );
}
