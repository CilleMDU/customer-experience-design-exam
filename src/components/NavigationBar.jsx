import { NavLink } from "react-router";
import styles from "./NavigationBar.module.css";

export default function NavigationBar() {
  return (
    <nav className={styles.NavigationBar}>
      <div className={styles.pages}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Produkter</NavLink>
        <NavLink to="/about">Om os</NavLink>
      </div>
    </nav>
  );
}
