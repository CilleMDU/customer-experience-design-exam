import { Routes, Route } from "react-router";
import NavigationBar from "./components/NavigationBar";
import FooterBar from "./components/FooterBar";
import HomePage from "./pages/homepage/homepage";
import ProductPage from "./pages/productPage/productPage";
import ProductDetailPage from "./pages/productDetailPages/productDetailPage";
import ErrorPage from "./pages/errorpage/errorpage";
import About from "./pages/about/about";

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <FooterBar />
    </>
  );
}

export default App;
