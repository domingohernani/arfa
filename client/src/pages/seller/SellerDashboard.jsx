import React from "react";
import OrdersOverTime from "../../components/graphs/OrdersOverTime";
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "@heroicons/react/20/solid";
import WeeklySale from "../../components/graphs/WeeklySale";

export const SellerDashboard = () => {
  return (
    <section className="p-5">
      <section className="flex flex-wrap gap-5 pb-5">
        <div className="flex justify-between flex-1 px-5 py-5 text-white bg-green-500 rounded-md shadow-sm ">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">₱10.540</h3>
              <p className="text-xs font-semibold">Total Revenue</p>
            </div>
            <span>22.45%</span>
          </div>
          <CurrencyDollarIcon className="w-10"></CurrencyDollarIcon>
        </div>
        <div className="flex justify-between flex-1 px-5 py-5 text-white bg-green-400 rounded-md shadow-sm ">
          <div className="flex items-center gap-5">
            <div className="">
              <h3 className="text-base">56</h3>
              <p className="text-xs font-semibold">New Orders</p>
            </div>
            <span>22.45%</span>
          </div>
          <ShoppingBagIcon className="w-10"></ShoppingBagIcon>
        </div>
        <div className="flex justify-between flex-1 px-5 py-5 text-white bg-green-600 rounded-md shadow-sm ">
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
      <section className="flex gap-5 text-gray-500 ">
        <div className="p-5 bg-white rounded-md shadow-sm basis-3/4">
          <OrdersOverTime />
        </div>
        <div className="flex flex-col self-stretch px-5 bg-white rounded-md shadow-sm basis-1/4 justify-evenly">
          <div className="flex flex-col gap-5 ">
            <h3 className="text-base font-medium">Weekly Sales</h3>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">1,259</span>
              <span className="text-xs">Items Sold</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-semibold">₱12,546</span>
              <span className="text-xs">Revenue</span>
            </div>
          </div>
          <hr className="border-t border-dashed " />
          <WeeklySale />
        </div>
      </section>
    </section>
  );
};
