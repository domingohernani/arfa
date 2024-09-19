import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeftIcon, FolderIcon } from "@heroicons/react/20/solid";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <section className="m-5">
      <nav className="flex items-center gap-2 ">
        <div className="p-1 border rounded-sm w-fit">
          <ArrowLeftIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/seller-page/order")}
          />
        </div>
        <div className="flex items-center gap-2">
          <h6 className="cursor-pointer hover:text-arfagreen">Order</h6>
          <h6 className="cursor-pointer">/</h6>
          <h6 className="cursor-pointer hover:text-arfagreen">Details</h6>
        </div>
      </nav>
      <header className="p-4 mt-4 border rounded-sm">
        <section className="flex items-center justify-between">
          <div className="flex flex-col">
            <h6 className="font-medium">Order #{id}</h6>
            <div className="flex gap-2">
              <p className="px-2 py-1 text-sm font-medium text-blue-500 rounded-sm bg-blue-50 w-fit">
                Ready for ship
              </p>
              <p className="px-2 py-1 text-sm font-medium text-red-500 rounded-sm bg-red-50 w-fit">
                Delivery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-2 py-1 text-sm font-medium border border-gray-300 rounded-sm text-arfablack">
              <FolderIcon className="w-4 h-4 text-gray-400" />
              Export
            </button>
            <button className="px-2 py-1 text-sm font-medium bg-blue-500 rounded-sm">
              Update status
            </button>
          </div>
        </section>
        <section className="flex flex-wrap justify-start gap-2">
          <div className="p-2 text-sm text-gray-600 rounded-sm bg-arfagray">
            <b className="font-medium text-black">Paid: </b> 2024-03-12, 12:56
            pm
          </div>
          <div className="p-2 text-sm text-gray-600 rounded-sm bg-arfagray">
            <b className="font-medium text-black">Placed: </b> 2024-03-12, 12:56
            pm
          </div>
          <div className="p-2 text-sm text-gray-600 rounded-sm bg-arfagray">
            <b className="font-medium text-black">Updated: </b> 2024-03-12,
            12:56 pm
          </div>
        </section>
      </header>
      <main className="flex gap-4 mt-4 text-sm">
        <section className="flex-1 border rounded-sm">
          <section className="px-3 py-4 bg-arfagray">
            <span className="font-medium">Customer Details</span>
          </section>
          <section className="flex flex-col gap-1 p-4 ">
            <div className="flex justify-between gap-2">
              <div className="flex-1 font-medium">Name: </div>
              <div className="flex-1 text-gray-600">Hernani Domingo</div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 font-medium">Email: </div>
              <div className="flex-1 text-gray-600">harry@gmail.com</div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 font-medium">Phone: </div>
              <div className="flex-1 text-gray-600">09123456789</div>
            </div>
          </section>
        </section>
        <section className="flex-1 border rounded-sm">
          <section className="flex items-center justify-between p-3 bg-arfagray">
            <span className="font-medium">Shipping Address</span>
            <button className="flex items-center gap-2 px-4 py-1 text-sm font-medium border border-gray-300 rounded-sm text-arfablack">
              Edit
            </button>
          </section>
          <section className="flex flex-col gap-1 p-4 ">
            <p className="text-sm text-gray-600">
              Alcapa Zone 3, Cabaruan, Urdaneta City, Pangasinan, Region 1
            </p>
          </section>
        </section>
      </main>
    </section>
  );
};

export default OrderDetails;
