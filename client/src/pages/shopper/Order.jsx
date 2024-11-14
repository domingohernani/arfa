import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

const Order = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    navigate("all-orders");
  }, []);
  return (
    <>
      <div className="border-b border-gray-200">
        <ul className="flex flex-wrap mx-3 text-sm text-center" role="tablist">
          <li className="me-2">
            <Link
              to="all-orders"
              onClick={() => setActiveTab("all-orders")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "all-orders"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              All Orders
            </Link>
          </li>
          <li className="me-2">
            <Link
              to="in-process"
              onClick={() => setActiveTab("in-process")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "in-process"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              In Process
            </Link>
          </li>
          <li className="me-2">
            <Link
              to="completed"
              onClick={() => setActiveTab("completed")}
              className={`inline-block p-4 font-medium border-b-2 rounded-t-lg ${
                activeTab === "completed"
                  ? "border-b-black text-arfablack"
                  : "border-transparent text-arfablack"
              }`}
            >
              Completed
            </Link>
          </li>
        </ul>
        <Outlet />
      </div>
    </>
  );
};

export default Order;
