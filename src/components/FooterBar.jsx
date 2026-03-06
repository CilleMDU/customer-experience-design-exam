import { Link } from "react-router";

export default function FooterBar() {
  return (
    <footer>
      <p>&copy; 2026 UniquelyHer. All rights reserved.</p>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
    </footer>
  );
}
