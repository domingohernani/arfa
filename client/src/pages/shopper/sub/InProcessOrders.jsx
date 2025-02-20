import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrders } from "../../../firebase/orders";
import { auth, db } from "../../../firebase/firebase";
import { Link } from "react-router-dom";
import {
  getOrderStatusStyles,
  toSlug,
} from "../../../components/globalFunctions";
import { DeliveryLogs } from "../../../components/modals/DeliveryLogs";
import { InvoiceModal } from "../../../components/modals/InvoiceModal";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import noResult from "../../../assets/images/no-result.png";
import CancelOrder from "../../../components/modals/CancelOrder";
import { addCancellation } from "../../../firebase/cancellation";
import { doc, getDoc } from "firebase/firestore";

const PAGE_SIZE = 10;

const InProcessOrders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInvoiceOpen, setInvoiceOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [filterApplied, setFilterApplied] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  const handleCancelModalClose = () => {
    setCancelModal(false);
  };

  const confirmedCancellation = async (orderId, reason) => {
    try {
      const cancellationId = await addCancellation(orderId.id, reason);
      toast.success("Order successfully canceled!");
      refetch();
    } catch (error) {
      console.error("Error confirming cancellation:", error.message);
      toast.error("Failed to cancel the order. Please try again.");
    }
  };

  const fetchOrders = async ({ pageParam = null }) => {
    const shopperId = auth.currentUser?.uid;
    const filter = "In Process";
    const { orders, lastVisible } = await getOrders(
      shopperId,
      filter,
      pageParam,
      PAGE_SIZE
    );

    if (filterApplied) {
      const filteredOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt.seconds * 1000);
        if (fromDate && orderDate < new Date(fromDate)) return false;
        if (toDate && orderDate > new Date(toDate)) return false;
        return true;
      });

      return { orders: filteredOrders, nextPage: lastVisible };
    }

    return { orders, nextPage: lastVisible };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["orders", auth.currentUser?.uid, "In Process", filterApplied],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  const handleModalOpen = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleInvoiceOpen = (order) => {
    setSelectedInvoice(order);
    setInvoiceOpen(true);
  };
  const handleCancelOrderOpen = async (order) => {
    try {
      const userDocRef = doc(db, "users", order.shopId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        toast.error("No user found with the specified shopId.");
        return;
      }

      const userEmail = userSnapshot.data().email;
      console.log("User Email:", userEmail);

      if (order.orderStatus === "Placed") {
        setSelectedOrderId(order);
        setCancelModal(true);
      } else {
        toast.error(
          `This order has already been processed by the seller and cannot be cancelled. If you need further assistance, please contact the seller at ${userEmail}.`
        );
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching the user information.");
    }
  };

  const handleModalClose = () => {
    setSelectedOrder(null);
    setModalOpen(false);
  };

  const handleInvoiceClose = () => {
    setInvoiceOpen(false);
  };

  const handleApplyFilter = () => {
    if (fromDate && toDate && new Date(fromDate) > new Date(toDate)) {
      toast.error("The 'From' date cannot be later than the 'To' date.");
      return;
    }

    setFilterApplied(true);
    refetch();
  };

  const handleClearFilter = () => {
    setFromDate("");
    setToDate("");
    setFilterApplied(false);
    refetch();
  };

  const noOrders =
    !isFetching &&
    data?.pages &&
    data.pages.every((page) => page.orders.length === 0);

  if (error) return <p>Error fetching orders: {error.message}</p>;

  const renderSkeleton = () => {
    return Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="mt-3 mb-5 border">
        <div className="flex items-center justify-between p-3 max-md:flex-col md:p-5">
          <div className="flex flex-col gap-2 mr-auto">
            <Skeleton width={100} height={20} />
            <Skeleton width={150} height={20} />
            <Skeleton width={200} height={20} />
            <Skeleton width={80} height={20} />
          </div>
          <section className="flex flex-col items-end gap-2">
            <Skeleton width={100} height={30} />
            <section className="flex gap-2">
              <Skeleton width={120} height={40} />
              <Skeleton width={120} height={40} />
            </section>
          </section>
        </div>
        <div className="flex items-center px-3 mb-4 max-lg:flex-col md:px-11">
          <Skeleton height={144} width={144} />
          <div className="flex flex-col justify-center flex-1 col-span-4 sm:pl-8 max-sm:mt-4 max-sm:items-center">
            <Skeleton width={120} height={20} />
            <Skeleton width={100} height={20} />
            <Skeleton width={100} height={20} />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <section className="relative">
      <div className="w-full mx-auto md:px-8">
        {/* Date Range Selector */}
        <div className="flex flex-wrap items-center gap-3 mx-2 my-4 ml-auto md:w-fit md:justify-start">
          <div className="relative flex items-center flex-1 px-4 border rounded-md">
            <input
              type="date"
              name="from-dt"
              id="from-dt"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="flex flex-row-reverse text-sm text-gray-900 placeholder-gray-900 border-none appearance-none cursor-pointer focus:ring-transparent outline-0"
            />
          </div>
          <div className="hidden text-sm text-black sm:block">To</div>
          <div className="relative flex flex-1 px-4 border border-gray-300 rounded-md">
            <input
              type="date"
              name="to-dt"
              id="to-dt"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="flex flex-row-reverse text-sm text-gray-900 placeholder-gray-900 border-none appearance-none cursor-pointer focus:ring-transparent outline-0"
            />
          </div>
          <div className="block ml-auto sm:flex w-fit">
            <button
              className="px-4 py-2 mr-2 text-sm font-medium text-white rounded-md bg-arfagreen"
              onClick={handleApplyFilter}
            >
              Apply
            </button>
            <button
              className="px-4 py-2 mr-2 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-md"
              onClick={handleClearFilter}
            >
              Clear
            </button>
          </div>
        </div>

        {/* Orders Section */}
        {isFetching && renderSkeleton()}
        {noOrders && !isFetching ? (
          <div className="flex flex-col items-center justify-center mt-20">
            <img
              src={noResult}
              alt="No Results"
              className="object-contain w-64 h-64"
            />
            <p className="mt-5 text-sm text-gray-600">No orders found.</p>
          </div>
        ) : (
          <div>
            {data?.pages.map((page) =>
              page.orders.map((order) => (
                <div key={order.id} className="mt-3 mb-5 border">
                  <div className="flex items-center justify-between p-3 max-md:flex-col md:p-5">
                    <div className="flex flex-col gap-2 mr-auto">
                      <div className="text-sm text-black whitespace-nowrap">
                        Shop:{" "}
                        <span className="text-gray-500">{order.shopName}</span>
                      </div>
                      <div className="text-sm text-black whitespace-nowrap">
                        Order No.{" "}
                        <span className="text-gray-500">#{order.id}</span>
                      </div>
                      <div className="text-sm text-black whitespace-nowrap">
                        Placed On:{" "}
                        <span className="text-gray-500">
                          {new Date(
                            order.createdAt.seconds * 1000
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-sm text-black whitespace-nowrap">
                        Status:{" "}
                        <span
                          className={`${
                            getOrderStatusStyles(order.orderStatus).colorClass
                          } font-semibold`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>
                    </div>
                    <section className="flex flex-col gap-2">
                      <button
                        className="block px-5 py-1 ml-auto text-sm font-normal text-black rounded-md cursor-pointer w-fit hover:border hover:border-black"
                        onClick={() => handleCancelOrderOpen(order)}
                      >
                        Cancel Order
                      </button>
                      <div className="flex items-center gap-3 max-md:mt-5">
                        <button
                          className="py-2 text-sm font-normal text-gray-900 transition-all duration-500 bg-white border border-gray-300 rounded-md shadow-sm px-7 shadow-transparent"
                          onClick={() => handleInvoiceOpen(order)}
                        >
                          Show Invoice
                        </button>
                        <button
                          className="py-2 text-sm font-normal text-white transition-all duration-500 rounded-md shadow-sm bg-arfagreen px-7 shadow-transparent"
                          onClick={() => handleModalOpen(order)}
                        >
                          Delivery Logs
                        </button>
                      </div>
                    </section>
                  </div>

                  {/* Order Items */}
                  {order.orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center px-3 mb-4 max-lg:flex-col md:px-11"
                    >
                      <div className="flex w-full gap-2 md:grid md:grid-cols-4">
                        <div className="col-span-4 sm:col-span-1">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="object-cover border rounded-md h-36 w-36 max-sm:mx-auto aspect-square"
                          />
                        </div>
                        <div className="flex flex-col justify-center flex-1 col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 max-sm:items-center">
                          <h6 className="text-sm font-semibold leading-9 text-black whitespace-nowrap">
                            {item.name}
                          </h6>
                          <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                            {item.variant && (
                              <span className="text-sm font-normal text-gray-500 whitespace-nowrap">
                                Variant: {item.variant}
                              </span>
                            )}
                            <span className="text-sm font-normal text-gray-500 whitespace-nowrap">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm font-normal text-black whitespace-nowrap">
                              Price: ₱{item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-start justify-center max-sm:items-center">
                        <Link
                          className="text-sm font-semibold leading-8 text-left cursor-pointer hover:underline text-arfagreen whitespace-nowrap"
                          to={`/catalog/item/${toSlug(item.name)}/${item.id}`}
                        >
                          View Product
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        )}

        {/* Infinite Scroll Trigger */}
        {!noOrders && !isFetching && (
          <div className="flex items-center justify-center my-5">
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className="px-4 py-2 text-sm font-normal text-white rounded-md bg-arfagreen"
            >
              {isFetchingNextPage
                ? "Loading more..."
                : hasNextPage
                ? "Load More"
                : "No more orders"}
            </button>
          </div>
        )}

        {isFetching && !isFetchingNextPage && null}

        {/* Single Instance of OrderStatus Modal */}
        {isModalOpen && selectedOrder && (
          <DeliveryLogs
            isOpen={isModalOpen}
            close={handleModalClose}
            orderId={selectedOrder.id}
            status={selectedOrder.orderStatus}
            onDelivery={selectedOrder.onDelivery}
            statusTimestamps={selectedOrder.statusTimestamps}
            podUrl={selectedOrder.proofOfDeliveryUrl}
          />
        )}

        {/* Invoice Modal */}
        {isInvoiceOpen && selectedInvoice && (
          <InvoiceModal
            close={handleInvoiceClose}
            isOpen={isInvoiceOpen}
            invoice={selectedInvoice}
          />
        )}

        {/* Invoice Modal */}
        {cancelModal && selectedOrderId && (
          <CancelOrder
            close={handleCancelModalClose}
            isOpen={cancelModal}
            orderId={selectedOrderId}
            onCancelOrder={confirmedCancellation}
          />
        )}
      </div>
    </section>
  );
};

export default InProcessOrders;
