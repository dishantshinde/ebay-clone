import "./App.css";
import Navbar from "./components/navbar";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "./redux/slices/categories/getCategoriesApi";
import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Products from "./pages/products";
import ProductDetails from "./pages/productDetail";
import Categories from "./pages/categories";
import { fetchDeals } from "./redux/slices/deals/dealApi";
import { fetchProducts } from "./redux/slices/products/productApi";
import { fetchProductDetails } from "./redux/slices/productDetails/productDetailsApi";
import Cart from "./pages/Cart";
import Watchlist from "./pages/watchlist";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchDeals());
    dispatch(fetchProducts("top deals"));
  }, [dispatch]);

  const apiKey = process.env.REACT_APP_API_KEY;

  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}
function AppContent() {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Dashboard />}>
          {/* Nested route for /categories/products */}
          <Route index element={<Categories />} />
          <Route path=":categoryquery/products" element={<Products />} />
          {/* Nested route for individual product details */}
          <Route
            path=":categoryquery/products/:productId"
            element={<ProductDetails />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="watchlist/products" element={<Watchlist />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {location.pathname !== "/login" && location.pathname !== "/signup" && (
        <Footer />
      )}
    </>
  );
}

export default App;
