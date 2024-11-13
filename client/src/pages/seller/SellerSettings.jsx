import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { doSignOut } from "../../firebase/auth";
import { useStore } from "../../stores/useStore";
import { Logout } from "../../components/modals/Logout";

const SellerSettings = () => {
  const navigate = useNavigate();
  const [logoutModal, setLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    navigate("profile");
  }, []);

  function closeModal() {
    setActiveTab("profile");
    navigate("profile");
    setLogoutModal(false);
  }

  const logout = () => {
    setActiveTab("logout");
    setLogoutModal(true);
  };

  return (
    <section className="px-5 pt-2">
      <Logout isOpen={logoutModal} close={closeModal} />
      <div className="mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm text-center"
          role="tablist"
        >
          <li className="me-2">
            <Link
              to="profile"
              onClick={() => setActiveTab("profile")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "profile"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Profile
            </Link>
          </li>
          <li className="me-2">
            <Link
              to="security"
              onClick={() => setActiveTab("security")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "security"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Security
            </Link>
          </li>
          <li className="me-2">
            <Link
              to="payout"
              onClick={() => setActiveTab("payout")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "payout"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Payout
            </Link>
          </li>
          <li className="me-2">
            <Link
              onClick={logout}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "logout"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </section>
  );
};

export default SellerSettings;
