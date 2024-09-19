import React from "react";
import OrdersOverTime from "../../components/graphs/OrdersOverTime";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import WeeklySale from "../../components/graphs/WeeklySale";
import BasicTable from "../../components/tables/BasicTable";

export const SellerDashboard = () => {
  const rowData = [
    { name: "Jagarnath S.", date: "24.05.2023", amount: "₱ 1,060" },
    { name: "Anand G.", date: "23.05.2023", amount: "₱ 3,060" },
    { name: "Kartik S.", date: "23.05.2023", amount: "₱ 1,590" },
    { name: "Rakesh S.", date: "22.05.2023", amount: "₱ 3,060" },
    { name: "Anup S.", date: "22.05.2023", amount: "₱ 2,990" },
  ];

  const columnDefs = [
    { headerName: "Name", field: "name", filter: false },
    { headerName: "Date", field: "date", filter: false },
    { headerName: "Amount", field: "amount", filter: false },
  ];

  return (
    <section className="p-5">
      <section className="grid grid-cols-1 gap-5 pb-5 md:grid-cols-3">
        <div className="flex justify-between px-5 py-5 text-white bg-green-500 rounded-md">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">₱10.540</h3>
              <p className="text-xs font-semibold">Total Revenue</p>
            </div>
            <span>22.45%</span>
          </div>
          <CurrencyDollarIcon className="w-10"></CurrencyDollarIcon>
        </div>
        <div className="flex justify-between px-5 py-5 text-white bg-green-400 rounded-md">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">56</h3>
              <p className="text-xs font-semibold">New Orders</p>
            </div>
            <span>22.45%</span>
          </div>
          <ShoppingBagIcon className="w-10"></ShoppingBagIcon>
        </div>
        <div className="flex justify-between px-5 py-5 text-white bg-green-600 rounded-md">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">1,056</h3>
              <p className="text-xs font-semibold">Orders</p>
            </div>
            <span>22.45%</span>
          </div>
          <ShoppingCartIcon className="w-10"></ShoppingCartIcon>
        </div>
      </section>
      <section className="flex flex-col gap-5 pb-5 md:flex-row ">
        <div className="p-5 bg-white border basis-4/6">
          <OrdersOverTime />
        </div>
        <div className="flex flex-col self-stretch w-full gap-2 py-5 bg-white border basis-1/3 justify-evenly">
          <WeeklySale />
        </div>
      </section>
      <section className="flex flex-col gap-5 lg:flex-row">
        <div className="py-5 bg-white border basis-1/2">
          <BasicTable
            rowData={rowData}
            columnDefs={columnDefs}
            title="Recent Transactions"
          ></BasicTable>
        </div>
        <div className="py-5 bg-white border basis-1/2">
          <BasicTable
            rowData={rowData}
            columnDefs={columnDefs}
            title="Top Products by Units Sold"
          ></BasicTable>
        </div>
      </section>
    </section>
  );
};
