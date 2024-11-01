import React from "react";
import TopSeller from "../../components/tables/TopSeller";
import { useStore } from "../../stores/useStore";
import { Outlet, useLocation } from "react-router-dom";

const SellerReports = () => {
  const { loggedUser } = useStore();
  const location = useLocation();

  const isOutletPage = location.pathname.includes("/furniture-transaction/");

  return (
    <div>
      {!isOutletPage ? <TopSeller shopId={loggedUser?.userId} /> : <Outlet />}
    </div>
  );
};

export default SellerReports;
