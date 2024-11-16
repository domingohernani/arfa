import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getOrders } from "../../../firebase/orders";
import { auth } from "../../../firebase/firebase";
import { Link } from "react-router-dom";
import { toSlug } from "../../../components/globalFunctions";

const PAGE_SIZE = 10;

const InProcessOrders = () => {
  const fetchOrders = async ({ pageParam = null }) => {
    const shopperId = auth.currentUser?.uid;
    const filter = "In Process"; // Filter for In Process orders
    const { orders, lastVisible } = await getOrders(
      shopperId,
      filter,
      pageParam,
      PAGE_SIZE
    );
    return { orders, nextPage: lastVisible };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["orders", auth.currentUser?.uid, "In Process"],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) => lastPage.nextPage || undefined,
  });

  if (error) return <p>Error fetching orders: {error.message}</p>;

  return (
    <section className="relative">
      <div className="w-full mx-auto md:px-8">
        <h2 className="text-2xl font-semibold text-gray-800">
          In Process Orders
        </h2>

        {/* Orders Section */}
        <div className="">
          {data?.pages.map((page) =>
            page.orders.map((order) => {
              return (
                <div key={order.id} className="mt-3 mb-5 border">
                  <div className="flex items-center justify-between p-3 max-md:flex-col md:p-5">
                    <div className="flex flex-col gap-2">
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
                    </div>
                    <div className="flex items-center gap-3 max-md:mt-5">
                      <button className="py-2 text-sm font-normal text-gray-900 transition-all duration-500 bg-white border border-gray-300 rounded-full shadow-sm px-7 shadow-transparent hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-400">
                        Show Invoice
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  {order.orderItems.map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="flex items-center px-3 mb-4 max-lg:flex-col md:px-11"
                      >
                        <div className="grid w-full grid-cols-4">
                          <div className="col-span-4 sm:col-span-1">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="object-cover rounded-md h-36 w-36 max-sm:mx-auto aspect-square"
                            />
                          </div>
                          <div className="flex flex-col justify-center col-span-4 sm:col-span-3 max-sm:mt-4 sm:pl-8 max-sm:items-center">
                            <h6 className="mb-3 text-sm font-normal leading-9 text-black whitespace-nowrap">
                              {item.name}
                            </h6>
                            <div className="flex items-center max-sm:flex-col gap-x-10 gap-y-3">
                              {item.variant ? (
                                <span className="text-sm font-normal text-gray-500 whitespace-nowrap">
                                  Variant: {item.variant}
                                </span>
                              ) : null}
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
                    );
                  })}
                </div>
              );
            })
          )}
        </div>

        {/* Infinite Scroll Trigger */}
        <div className="flex items-center justify-center my-5">
          <button
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="px-4 py-2 text-sm font-normal text-white rounded-full bg-arfagreen"
          >
            {isFetchingNextPage
              ? "Loading more..."
              : hasNextPage
              ? "Load More"
              : "No more orders"}
          </button>
        </div>
        {isFetching && !isFetchingNextPage && <p>Loading...</p>}
      </div>
    </section>
  );
};

export default InProcessOrders;
