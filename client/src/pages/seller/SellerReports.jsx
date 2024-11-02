import React, { useState } from "react";
import TopSeller from "../../components/tables/TopSeller";
import MostRated from "./sub/MostRated";
import { useStore } from "../../stores/useStore";
import YearlyRevenue from "./sub/YearlyRevenue";

const SellerReports = () => {
  const { loggedUser } = useStore();
  const [activeTab, setActiveTab] = useState("top-seller"); // Default to "Top Seller"

  return (
    <section className="px-5 pt-2">
      <div className="mb-4 border-b border-gray-200">
        <ul
          className="flex flex-wrap -mb-px text-sm text-center"
          role="tablist"
        >
          <li className="me-2">
            <button
              onClick={() => setActiveTab("top-seller")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "top-seller"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Top Seller
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab("most-rated")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "most-rated"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Most Rated
            </button>
          </li>
          <li className="me-2">
            <button
              onClick={() => setActiveTab("revenue")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "revenue"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Revenue
            </button>
          </li>
        </ul>
      </div>

      {/* Render Components Based on Selected Tab */}
      <div className="flex flex-col gap-5">
        {activeTab === "top-seller" && (
          <TopSeller shopId={loggedUser?.userId} />
        )}
        {activeTab === "most-rated" && (
          <MostRated shopId={loggedUser?.userId} />
        )}
        {activeTab === "revenue" && (
          <YearlyRevenue shopId={loggedUser?.userId} />
        )}
      </div>
    </section>
  );
};

export default SellerReports;
