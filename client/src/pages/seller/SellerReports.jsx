import React from "react";
import TopSeller from "../../components/tables/TopSeller";
import { useStore } from "../../stores/useStore";
import { Outlet, useLocation } from "react-router-dom";
import MostRated from "./sub/MostRated";

const SellerReports = () => {
  const { loggedUser } = useStore();
  const location = useLocation();

  const isOutletPage = location.pathname.includes("/furniture-transaction/");

  return (
    <div>
      {!isOutletPage ? (
        <section className="flex flex-col gap-5 p-5">
          <TopSeller shopId={loggedUser?.userId} />
          <MostRated shopId={loggedUser?.userId} />
        </section>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default SellerReports;
