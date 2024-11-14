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
// import PaymentMethod from "./pages/shopper/PaymentMethod";
import Security from "./pages/shopper/Security";
import LoginShopper from "./pages/auth/LoginShopper";
import SignupShopper from "./pages/auth/SignupShopper";
import { SellerDashboard } from "./pages/seller/SellerDashboard";
import ShopperProtectedRoutes from "./utils/ShopperProtectedRoutes";
import SellerLayout from "./pages/seller/SellerLayout";
import SellerOrders from "./pages/seller/SellerOrders";
import SellerTransaction from "./pages/seller/SellerTransaction";
import SellerCustomers from "./pages/seller/SellerCustomers";
import SellerReports from "./pages/seller/SellerReports";
import SellerInbox from "./pages/seller/SellerInbox";
import CartWishlistAugmentedReality from "./pages/shopper/CartWishlistAugmentedReality";
import DisplayFurnituresCategory from "./components/dynamic/DisplayFurnituresCategory";
import NotFound from "./pages/NotFound";
import SignupSeller from "./pages/auth/SignupSeller";
import LoginSeller from "./pages/auth/LoginSeller";
import ShowMultiModel from "./components/ShowMultiModel";
import DisplayChat from "./components/dynamic/DisplayChat";
import SelectChat from "./components/SelectChat";
import SellerProtectedRoutes from "./utils/SellerProtectedRoutes";
import SellerProductsListing from "./pages/seller/SellerProductsListing";
import SellerDelivery from "./pages/seller/SellerDelivery";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import OrderDetails from "./pages/seller/sub/OrderDetails ";
import SellerProductStock from "./pages/seller/SellerProductStock";
import SellerProductReviews from "./pages/seller/SellerProductReviews";
import ProductDetails from "./pages/seller/sub/ProductDetails";
import ProductReviews from "./pages/seller/sub/ProductReviews";
import SellerAddProduct from "./pages/seller/SellerAddProduct";
import ProductStockHistory from "./pages/seller/sub/ProductStockHistory";
import { Toaster } from "react-hot-toast";
import SellerSettings from "./pages/seller/SellerSettings";
import SellerUserProfile from "./pages/seller/sub/SellerUserProfile";
import SellerUserSecurity from "./pages/seller/sub/SellerUserSecurity";
import SellerUserPayout from "./pages/seller/sub/SellerUserPayout";
import { FurnitureTransaction } from "./components/tables/FurnitureTransaction";
import TransactionDetails from "./pages/seller/sub/TransactionDetails";
import SellerImageHotspot from "./pages/seller/SellerImageHotspot";

function App() {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          {/* Public routes */}
          <Route element={<LandingPage />} path="/"></Route>
          <Route element={<LoginShopper />} path="/login-shopper"></Route>
          <Route element={<SignupShopper />} path="/signup-shopper"></Route>

          <Route element={<SignupSeller />} path="/signup-seller"></Route>
          <Route element={<LoginSeller />} path="/login-seller"></Route>

          <Route path="/catalog" element={<Catalog />}>
            <Route index element={<DisplayFurniture />} />
            <Route path="category/:category" element={<DisplayFurniture />} />
            <Route path="item/:item/:id/" element={<ViewFurniture />} />
            <Route
              path="category/:category/item/:item/:id"
              element={<ViewFurniture />}
            />
          </Route>

          {/* Private routes: exclusive to shopper */}
          <Route element={<ShopperProtectedRoutes />}>
            <Route element={<Cart />} path="/cart"></Route>
            <Route
              element={<ShowMultiModel />}
              path="/:page/augmented-reality"
            ></Route>
            <Route element={<Wishlist />} path="/wishlist"></Route>
            <Route path="/profile" element={<Profile />}>
              <Route element={<UserProfile />} path="user-profile" />
              <Route element={<Order />} path="order" />
              <Route element={<Inbox />} path="inbox" />
              {/* <Route element={<PaymentMethod />} path="payment-method" /> */}
              <Route element={<Security />} path="security" />
            </Route>
          </Route>

          {/* Private routes: exclusive to seller */}
          <Route element={<SellerProtectedRoutes />}>
            <Route element={<SellerLayout />} path="/seller-page">
              <Route element={<SellerDashboard />} path="dashboard" />
              <Route path="order" element={<SellerOrders />}>
                {/* Child Route */}
                <Route path="details/:id" element={<OrderDetails />} />
              </Route>

              <Route path="add-new-product" element={<SellerAddProduct />} />
              <Route path="product-info" element={<SellerProductsListing />}>
                <Route path="details/:id" element={<ProductDetails />} />
              </Route>
              <Route element={<SellerProductStock />} path="product-stock">
                <Route path="furniture/:id" element={<ProductStockHistory />} />
              </Route>
              <Route element={<SellerProductReviews />} path="product-reviews">
                <Route path="furniture/:id" element={<ProductReviews />} />
              </Route>
              <Route element={<SellerImageHotspot />} path="image-hotspot" />

              <Route element={<SellerDelivery />} path="delivery" />

              <Route element={<SellerTransaction />} path="transaction">
                <Route path="details/:id" element={<TransactionDetails />} />
              </Route>

              <Route path="report" element={<SellerReports />}>
                <Route
                  path="furniture-transaction/:id"
                  element={<FurnitureTransaction />}
                />
              </Route>

              <Route element={<SellerInbox />} path="inbox" />

              <Route path="settings" element={<SellerSettings />}>
                <Route index element={<SellerUserProfile />} />
                <Route path="profile" element={<SellerUserProfile />} />
                <Route path="security" element={<SellerUserSecurity />} />
                <Route path="payout" element={<SellerUserPayout />} />
              </Route>
            </Route>
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
