import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductsScreen from "./Screens/Products/products";
import CategoriesScreen from "./Screens/Categories/categories";
import OrdersScreen from "./Screens/Orders/orders";
import NotFound from "./Screens/PageNotFound/pageNotFound";

function AppContent() {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || "products";

  return (
    <div className="app-root">
      <Sidebar active={currentPath} />
      <main className="app-main">
        <div className="app-main__inner">
          <Routes>
            <Route path="/" element={<ProductsScreen />} />
            <Route path="/products" element={<ProductsScreen />} />
            <Route path="/categories" element={<CategoriesScreen />} />
            <Route path="/orders" element={<OrdersScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
