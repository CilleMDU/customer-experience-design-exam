import { NavLink } from "react-router";
import styles from "./NavigationBar.module.css";
import shoppingBag from "../assets/shopping-bag.svg";
import hjerteIkon from "../assets/heart-icon.svg";
import profilIkon from "../assets/profile-icon.svg";
import searchIkon from "../assets/search-icon.svg";
import darkmodeIkon from "../assets/darkmode-icon.svg";
import navbarLogo from "../assets/navbar-logo.svg";
import { useDarkMode } from "../hooks/useDarkMode.jsx";

export default function NavigationBar() {
  const { isDark, setIsDark } = useDarkMode();

  return (
    <nav className={styles.NavigationBar}>
      <a
        href="/customer-experience-design-exam/"
        className={styles.logoLink}
      >
        <img src={navbarLogo} alt="logo" className={styles.logo} />
      </a>

      <div className={styles.pages}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Produkter</NavLink>
        <NavLink to="/about">Om os</NavLink>
      </div>
      <div className={styles.ikoner}>
        <button
          onClick={() => setIsDark(!isDark)}
          className={styles.darkmodeButton}
          aria-label="Toggle dark mode"
        >
          <img src={darkmodeIkon} alt="darkmode knap" />
        </button>
        <img
          src={searchIkon}
          alt="søge funktion"
          className={styles.searchIkon}
        />
        <img src={profilIkon} alt="profil" className={styles.profilIkon} />
        <img src={hjerteIkon} alt="favoritter" className={styles.hjerteIkon} />
        <img
          src={shoppingBag}
          alt="Indkøbskurv"
          className={styles.shoppingBag}
        />
      </div>
    </nav>
  );
}
