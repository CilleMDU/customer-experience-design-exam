import { NavLink } from "react-router";
import styles from "./NavigationBar.module.css";
import shoppingBag from "../assets/shopping-bag.svg";
import hjerteIkon from "../assets/heart-icon.svg";
import profilIkon from "../assets/profile-icon.svg";
import searchIkon from "../assets/search-icon.svg";
import darkmodeIkon from "../assets/darkmode-icon.svg";
import navbarLogo from "../assets/navbar-logo.svg";

export default function NavigationBar() {
  return (
    <nav className={styles.NavigationBar}>
      <a href="/" className={styles.logoLink}>
        <img src={navbarLogo} alt="logo" />
      </a>

      <div className={styles.pages}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Produkter</NavLink>
        <NavLink to="/about">Om os</NavLink>
      </div>
      <div className={styles.ikoner}>
        <img src={darkmodeIkon} alt="darkmode knap" />
        <img src={searchIkon} alt="søge funktion" />
        <img src={profilIkon} alt="profil" />
        <img src={hjerteIkon} alt="favoritter" />
        <img src={shoppingBag} alt="Indkøbskurv" />
      </div>
    </nav>
  );
}
