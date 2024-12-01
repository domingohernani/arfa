import React, { useEffect, useState } from "react";
import OrdersOverTime from "../../components/graphs/OrdersOverTime";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import WeeklySale from "../../components/graphs/WeeklySale";
import BasicTable from "../../components/tables/BasicTable";
import { fetchTopSellers, getMonthlyMetrics } from "../../firebase/shop";
import { useStore } from "../../stores/useStore";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { formatToPeso } from "../../components/globalFunctions";
import { EyeIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import LowStock from "../../components/tables/LowStock";

export const SellerDashboard = () => {
  const { loggedUser } = useStore();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState({
    monthlyRevenue: 0,
    revenueGrowth: 0,
    newMonthlyOrders: 0,
    ordersGrowth: 0,
    totalOrders: 0,
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducs, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!loggedUser?.userId) return;

      const result = await getMonthlyMetrics(loggedUser.userId);
      if (result.success) {
        setMetrics(result.data);
      } else {
        console.error("Failed to fetch monthly metrics:", result.error);
      }
    };

    fetchMetrics();
  }, [loggedUser]);

  const fetchRecentOrders = async () => {
    try {
      if (!loggedUser?.userId) return;

      const ordersCollectionRef = collection(db, "orders");
      const ordersQuery = query(
        ordersCollectionRef,
        where("shopId", "==", loggedUser.userId),
        where("orderStatus", "not-in", ["Delivered", "Picked-up"]),
        orderBy("createdAt", "desc"),
        limit(5)
      );

      const ordersSnapshot = await getDocs(ordersQuery);

      const recentOrdersData = ordersSnapshot.docs.map((doc) => {
        const order = doc.data();
        return {
          orderId: doc.id,
          date: order.createdAt.toDate().toLocaleDateString(),
          amount: formatToPeso(order.orderTotal || 0),
        };
      });

      setRecentOrders(recentOrdersData);
    } catch (error) {
      console.error("Error fetching recent orders:", error);
    }
  };

  useEffect(() => {
    fetchRecentOrders();
  }, [loggedUser]);

  useEffect(() => {
    const fetchData = async () => {
      if (!loggedUser) return;
      const sellersData = await fetchTopSellers(loggedUser.userId, "all");
      setTopProducts(sellersData);
    };
    fetchData();
  }, [loggedUser]);

  const columnRecentOrderDefs = [
    { headerName: "Order ID", field: "orderId", filter: false },
    { headerName: "Date", field: "date", filter: false },
    { headerName: "Amount", field: "amount", filter: false },
    {
      headerName: "Action",
      flex: 1,
      filter: false,
      cellRenderer: (params) => {
        return (
          <section className="flex items-center justify-center gap-2 px-2 mt-1">
            <button
              className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
              onClick={() => {
                navigate(`/seller-page/order/details/${params.data.orderId}`);
              }}
            >
              <EyeIcon className="inline-block w-4 h-4 mr-1" />
              <span className="text-sm">View</span>
            </button>
          </section>
        );
      },
    },
  ];

  const columnTopProdDefs = [
    { headerName: "Name", field: "name", filter: false, flex: 1 },
    { headerName: "Unit Sold", field: "unitsSold", filter: false, flex: 1 },
    { headerName: "Revenue", field: "revenue", filter: false, flex: 1 },
    {
      headerName: "Action",
      flex: 1,
      filter: false,
      cellRenderer: (params) => {
        return (
          <section className="flex items-center justify-center gap-2 px-2 mt-1">
            <button
              className="px-2 py-1 text-sm font-normal border border-gray-300 rounded-sm bg-arfagray text-arfablack btn-update"
              onClick={() => {
                navigate(
                  `/seller-page/product-info/details/${params.data.productId}`
                );
              }}
            >
              <EyeIcon className="inline-block w-4 h-4 mr-1" />
              <span className="text-sm">View</span>
            </button>
          </section>
        );
      },
    },
  ];

  return (
    <section className="p-5">
      <section className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-3">
        <div className="flex justify-between px-5 py-5 text-white bg-green-500 rounded-md">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">
                ₱{metrics.monthlyRevenue.toLocaleString()}
              </h3>
              <p className="text-xs font-semibold">Monthly Revenue</p>
            </div>
            <span>{metrics.revenueGrowth.toFixed(2)}%</span>
          </div>
          <CurrencyDollarIcon className="w-10"></CurrencyDollarIcon>
        </div>
        <div className="flex justify-between px-5 py-5 text-white bg-green-400 rounded-md">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">
                {metrics.newMonthlyOrders} purchase(s)
              </h3>
              <p className="text-xs font-semibold">Monthly Purchases</p>
            </div>
            <span>{metrics.ordersGrowth.toFixed(2)}%</span>
          </div>
          <ShoppingBagIcon className="w-10"></ShoppingBagIcon>
        </div>
        <div className="flex justify-between px-5 py-5 text-white bg-green-600 rounded-md">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">{metrics.totalOrders} purchase(s)</h3>
              <p className="text-xs font-semibold">Total Purchases</p>
            </div>
          </div>
          <ShoppingCartIcon className="w-10"></ShoppingCartIcon>
        </div>
      </section>
      <section className="flex flex-col gap-5 pb-5 md:flex-row ">
        <div className="p-5 bg-white border basis-4/6">
          <OrdersOverTime shopId={loggedUser.userId} />
        </div>
        <div className="flex flex-col self-stretch w-full gap-2 py-5 bg-white border basis-1/3 justify-evenly">
          <WeeklySale shopId={loggedUser.userId} />
        </div>
      </section>
      <section className="flex flex-col gap-5 lg:flex-row">
        <div className="py-5 bg-white border basis-1/2">
          <BasicTable
            rowData={recentOrders}
            columnDefs={columnRecentOrderDefs}
            title="Recent Orders"
          ></BasicTable>
        </div>
        <div className="py-5 bg-white border basis-1/2">
          <BasicTable
            rowData={topProducs}
            columnDefs={columnTopProdDefs}
            title="Top Products by Units Sold"
          ></BasicTable>
        </div>
      </section>
      <section
        className="flex flex-col mt-5 border"
        style={{ height: "500px" }}
      >
        <h2 className="px-10 py-3 mt-5 text-base font-semibold text-gray-900">
          Low Stock Products
        </h2>
        <LowStock></LowStock>
      </section>
    </section>
  );
};
