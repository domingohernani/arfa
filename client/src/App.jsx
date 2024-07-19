import "./App.css";
import "@google/model-viewer";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Catalog from "./pages/Catalog";
import LandingPage from "./pages/LandingPage";
import DisplayFurniture from "./components/dynamic/DisplayFurnitures";
import ViewFurniture from "./components/ViewFurniture";
import Cart from "./pages/shopper/Cart";
import Wishlist from "./pages/shopper/Wishlist";
import Profile from "./pages/shopper/Profile";
import UserProfile from "./pages/shopper/UserProfile";
import Order from "./pages/shopper/Order";
import Inbox from "./pages/shopper/Inbox";
import PaymentMethod from "./pages/shopper/PaymentMethod";
import Security from "./pages/shopper/Security";
import LoginShopper from "./pages/auth/LoginShopper";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<LandingPage />} path="/"></Route>
          <Route element={<LoginShopper />} path="/login-shopper"></Route>

          <Route path="/catalog" element={<Catalog />}>
            <Route index element={<DisplayFurniture />} />
            <Route path=":item" element={<ViewFurniture />} />
          </Route>

          {/* Private routes: exclusive to shopper */}
          <Route element={<Cart />} path="/cart"></Route>
          <Route element={<Wishlist />} path="/wishlist"></Route>

          <Route path="/profile" element={<Profile />}>
            <Route element={<UserProfile />} path="user-profile" />
            <Route element={<Order />} path="order" />
            <Route element={<Inbox />} path="inbox" />
            <Route element={<PaymentMethod />} path="payment-method" />
            <Route element={<Security />} path="security" />
          </Route>

          {/* Private routes: exclusive to seller */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
