import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  FolderIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";
import ItemsOrdered from "../../../components/tables/ItemsOrdered";
import OrderReceipt from "../../../components/tables/OrderReceipt";
import { getOrderById } from "../../../firebase/orders";
import { getUserById } from "../../../firebase/user";
import { getOrderStatusStyles } from "../../../components/globalFunctions";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const orderResult = await getOrderById(id);
        console.log("order: ", orderResult);
        setOrder(orderResult);
        const userResult = await getUserById(orderResult.shopperId);
        console.log("customer: ", userResult);
        setCustomer(userResult);
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if ((loading || !order, !customer)) {
    return <div>Loading...</div>;
  }

  const getStatusColor = () => {
    const { colorClass } = getOrderStatusStyles(order.orderStatus);
    const bgColorClass = colorClass.includes("-300")
      ? colorClass.replace("text", "bg").replace("-300", "-50")
      : colorClass.replace("text", "bg").replace(/-\d{3}/, "-100");
    return { colorClass, bgColorClass };
  };

  return (
    <section className="m-5">
      <nav className="flex items-center gap-2">
        <div className="p-1 w-fit">
          <ArrowLeftIcon
            className="w-5 h-5 cursor-pointer"
            onClick={() => navigate("/seller-page/order")}
          />
        </div>
        <div className="flex items-center gap-2">
          <h6
            className="cursor-pointer hover:text-arfagreen"
            onClick={() => navigate("/seller-page/order")}
          >
            Order
          </h6>
          <h6 className="cursor-pointer">/</h6>
          <h6 className="cursor-pointer hover:text-arfagreen">Details</h6>
        </div>
      </nav>
      <header className="mt-4 ">
        <section className="flex flex-wrap items-center justify-between">
          <div className="flex flex-col">
            <h6 className="font-medium">Order #{order.id}</h6>
            <div className="flex gap-2">
              <p
                className={`px-2 py-1 text-sm font-medium rounded-sm ${
                  getStatusColor().bgColorClass
                } w-fit ${getStatusColor().colorClass}`}
              >
                {order.orderStatus}
              </p>
              <p className="px-2 py-1 text-sm font-medium text-red-500 rounded-sm bg-red-50 w-fit">
                Delivery
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-2 sm:mb-0">
            <button className="flex items-center gap-2 px-2 py-1 text-sm font-medium border border-gray-300 rounded-sm text-arfablack">
              <FolderIcon className="w-4 h-4 text-gray-400" />
              Export
            </button>
            <button className="px-2 py-1 text-sm font-medium bg-blue-500 rounded-sm">
              Update Status
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
      <main className="flex flex-col gap-4 my-4 text-sm sm:flex-row">
        <section className="flex-1 border rounded-sm">
          <section className="px-3 py-4 bg-arfagray">
            <span className="font-medium">Customer Details</span>
          </section>
          <section className="flex flex-col gap-1 p-4 ">
            <div className="flex justify-between gap-2">
              <div className="flex-1 font-medium">Name: </div>
              <div className="flex-1 text-gray-600">{`${customer.firstName} ${customer.lastName}`}</div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 font-medium">Email: </div>
              <div className="flex-1 text-gray-600">{customer.email}</div>
            </div>
            <div className="flex justify-between gap-2">
              <div className="flex-1 font-medium">Phone: </div>
              <div className="flex-1 text-gray-600">{customer.phoneNumber}</div>
            </div>
          </section>
        </section>
        <section className="flex-1 border rounded-sm">
          <section className="flex items-center justify-between p-3 py-4 bg-arfagray">
            <span className="font-medium">Shipping Address</span>
          </section>
          <section className="flex flex-col gap-1 p-4 ">
            <p className="text-sm text-gray-600">
              {`${customer.location?.street}, ${customer.location?.barangay}, ${customer.location?.city}, ${customer.location?.province}, ${customer.location?.region}`}
            </p>
          </section>
        </section>
      </main>
      <main>
        <OrderReceipt />
      </main>
      <main className="mt-16">
        <ItemsOrdered orders={order.orderItems} />
      </main>
    </section>
  );
};

export default OrderDetails;
