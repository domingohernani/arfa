import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  FolderIcon,
  PencilIcon,
  ArrowPathIcon
} from "@heroicons/react/20/solid";
import ItemsOrdered from "../../../components/tables/ItemsOrdered";
import OrderReceipt from "../../../components/tables/OrderReceipt";
import { getOrderById } from "../../../firebase/orders";
import { getUserById } from "../../../firebase/user";
import { getOrderStatusStyles } from "../../../components/globalFunctions";
import { useReactToPrint } from "react-to-print";
import { OrderStatus } from "../../../components/modals/OrderStatus";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState();
  const [customer, setCustomer] = useState();
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });
  const [isModalOpen, setModalOpen] = useState(false);

  <style type="text/css" media="print">{"\
    @page {\ size: landscape;\ }\
  "}</style>

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const orderResult = await getOrderById(id);
      setOrder(orderResult);
      const userResult = await getUserById(orderResult.shopperId);
      setCustomer(userResult);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
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

  const handleModalClose = () => {
    setModalOpen(false);
  }

  const refreshPage = () => {
    fetchOrder();
  }

  return (
    <>
      <OrderStatus refreshPage={refreshPage} isOpen={isModalOpen} close={handleModalClose} orderId={order.id} status={order.orderStatus} onDelivery={order.onDelivery} statusTimestamps={order.statusTimestamps} />
      <section className="m-5" ref={contentRef}>
        <nav className="flex items-center gap-2">
          <div className="p-1 w-fit">
            <ArrowLeftIcon
              className="w-5 h-5 cursor-pointer"
              onClick={() => navigate("/seller-page/order")}
            />
          </div>
          <div className="flex items-center gap-2 no-print">
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
                  className={`px-2 py-1 text-sm font-semibold rounded-sm ${getStatusColor().bgColorClass
                    } w-fit ${getStatusColor().colorClass}`}
                >
                  {order.orderStatus}
                </p>
                <p className={`px-2 py-1 text-sm font-semibold  ${order.onDelivery ? "text-red-500 bg-red-50" : "text-blue-500 bg-blue-50"} rounded-sm  w-fit`}>
                  {order.onDelivery ? "Delivery" : "Pick-up"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-2 sm:mb-0 no-print">
              <button
                onClick={reactToPrintFn}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-center border border-gray-300 rounded-sm bg-arfagray min-w-max text-arfablack"
              >
                <FolderIcon className="w-4 h-4 text-gray-400" />
                Print
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-center text-white rounded-sm min-w-max bg-arfagreen"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <ArrowPathIcon className="w-4 h-4" />
                Update Status
              </button>
            </div>
          </section>
          <section className="flex flex-wrap justify-start gap-2">
            <div className="p-2 text-sm text-gray-600 rounded-sm bg-arfagray">
              <b className="font-medium text-black">Paid: </b>
              {order.createdAt && (
                new Date(order.createdAt.seconds * 1000).toLocaleDateString() + " " +
                new Date(order.createdAt.seconds * 1000).toLocaleTimeString()
              )}
            </div>
            <div className="p-2 text-sm text-gray-600 rounded-sm bg-arfagray">
              <b className="font-medium text-black">Placed: </b> {order.createdAt && (
                new Date(order.createdAt.seconds * 1000).toLocaleDateString() + " " +
                new Date(order.createdAt.seconds * 1000).toLocaleTimeString()
              )}
            </div>
            <div className="p-2 text-sm text-gray-600 rounded-sm bg-arfagray">
              <b className="font-medium text-black">Updated: </b> {order.updatedAt && (
                new Date(order.updatedAt.seconds * 1000).toLocaleDateString() + " " +
                new Date(order.updatedAt.seconds * 1000).toLocaleTimeString()
              )}
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
          <OrderReceipt details={order} customer={customer} />
        </main>
        <main className="mt-16">
          <ItemsOrdered orders={order} />
        </main>
      </section>
    </>

  );
};

export default OrderDetails;
