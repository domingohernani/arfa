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
import SignupShopper from "./pages/auth/SignupShopper";
import { SellerDashboard } from "./pages/seller/SellerDashboard";
import ShopperProtectedRoutes from "./utils/ShopperProtectedRoutes";
import SellerLayout from "./pages/seller/SellerLayout";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerProducts from "./pages/seller/SellerProducts";
import SellerCategories from "./pages/seller/SellerCategories";
import SellerCustomers from "./pages/seller/SellerCustomers";
import SellerReports from "./pages/seller/SellerReports";
import SellerInbox from "./pages/seller/SellerInbox";
import CartWishlistAugmentedReality from "./pages/shopper/CartWishlistAugmentedReality";
import DisplayFurnituresCategory from "./components/dynamic/DisplayFurnituresCategory";
import NotFound from "./pages/NotFound";
import SignupSeller from "./pages/auth/SignupSeller";
import LoginSeller from "./pages/auth/LoginSeller";
import ShowMultiModel from "./components/ShowMultiModel";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<LandingPage />} path="/"></Route>
          <Route element={<LoginShopper />} path="/login-shopper"></Route>
          <Route element={<SignupShopper />} path="/signup-shopper"></Route>

          <Route element={<SignupSeller />} path="/signup-seller"></Route>
          <Route element={<LoginSeller />} path="/login-seller"></Route>

          {/* <Route path="/catalog" element={<Catalog />}>
            <Route index element={<DisplayFurniture />} />
            <Route path=":category" element={<DisplayFurniture />}></Route>
            <Route path="item/:item" element={<ViewFurniture />} />
            <Route path=":category/item/:item" element={<ViewFurniture />} />
          </Route> */}

          <Route path="/catalog" element={<Catalog />}>
            <Route index element={<DisplayFurniture />} />
            <Route path="category/:category" element={<DisplayFurniture />} />
            <Route path="item/:item/:id/" element={<ViewFurniture />} />
            <Route
              path="category/:category/item/:item/:id"
              element={<ViewFurniture />}
            />
          </Route>

          <Route element={<ShowMultiModel />} path="/mutli"></Route>

          {/* Private routes: exclusive to shopper */}
          <Route element={<ShopperProtectedRoutes />}>
            <Route element={<Cart />} path="/cart"></Route>
            <Route
              element={<CartWishlistAugmentedReality />}
              path="/:page/augmented-reality"
            ></Route>
            <Route element={<Wishlist />} path="/wishlist"></Route>
            <Route path="/profile" element={<Profile />}>
              <Route element={<UserProfile />} path="user-profile" />
              <Route element={<Order />} path="order" />
              <Route element={<Inbox />} path="inbox" />
              <Route element={<PaymentMethod />} path="payment-method" />
              <Route element={<Security />} path="security" />
            </Route>
          </Route>

          {/* Private routes: exclusive to seller */}
          <Route element={<SellerLayout />} path="/seller-page">
            <Route element={<SellerDashboard />} path="dashboard" />
            <Route element={<SellerOrders />} path="order" />
            <Route element={<SellerProducts />} path="product" />
            <Route element={<SellerCategories />} path="category" />
            <Route element={<SellerCustomers />} path="customer" />
            <Route element={<SellerReports />} path="report" />
            <Route element={<SellerInbox />} path="inbox" />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
