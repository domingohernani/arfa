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

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<LandingPage />} path="/"></Route>

          <Route path="/catalog" element={<Catalog />}>
            <Route index element={<DisplayFurniture />} />
            <Route path=":item" element={<ViewFurniture />} />
          </Route>

          {/* Private routes: exclusive to shopper */}
          <Route element={<Cart />} path="/cart"></Route>
          <Route element={<Wishlist />} path="/wishlist"></Route>
          <Route element={<Profile />} path="/profile"></Route>

          {/* Private routes: exclusive to seller */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
