import React from "react";
import TopSeller from "../../components/tables/TopSeller";
import { useStore } from "../../stores/useStore";
import { Outlet, useLocation } from "react-router-dom";
import MostReviewed from "./sub/MostReviewed";

const SellerReports = () => {
  const { loggedUser } = useStore();
  const location = useLocation();

  const isOutletPage = location.pathname.includes("/furniture-transaction/");

  return (
    <div>
      {!isOutletPage ? (
        <section className="p-5">
          <TopSeller shopId={loggedUser?.userId} />
          <MostReviewed shopId={loggedUser?.userId} />
        </section>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default SellerReports;
