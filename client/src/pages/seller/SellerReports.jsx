import React from "react";
import TopSeller from "../../components/tables/TopSeller";
import { getAuth } from "firebase/auth";
import { useStore } from "../../stores/useStore";

const SellerReports = () => {
  const { loggedUser } = useStore();

  return (
    <div>
      <TopSeller shopId={loggedUser?.userId} />
    </div>
  );
};

export default SellerReports;
