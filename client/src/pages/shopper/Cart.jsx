import React, { useEffect, useRef, useState } from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { Tabs } from "flowbite-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import greaterthan from "../../assets/icons/greater-than.svg";
import heart from "../../assets/icons/heart-black.svg";
import { FooterSection } from "../../components/navigation/FooterSection";
import noWishlist from "../../assets/images/no-review.jpg";
import { getUserInfo } from "../../firebase/user";
import { fetchFurnitureById } from "../../firebase/furniture";
import {
  getAllImageDownloadUrl,
  getImageDownloadUrl,
} from "../../firebase/photos";
import ShowMultiModel from "../../components/ShowMultiModel";
import { formatToPeso, toSlug } from "../../components/globalFunctions";
import { clearCart, removeFromCart } from "../../firebase/cart";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebase/firebase";
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { getDeliveryFee, updateCartQuantity } from "../../firebase/delivery";
import { Switch } from "@headlessui/react";
import { saveOrder } from "../../firebase/orders";
import { updateStockFromOrder } from "../../firebase/stock";
import { checkPaymentStatus, createPaymentLink } from "../../firebase/paymongo";

const DisplayFurnituresOnCart = ({
  items,
  handleRemoveItem,
  fetchCart,
  setCart,
}) => {
  const [logoUrls, setLogoUrls] = useState({});
  const [deliveryFees, setDeliveryFees] = useState({});
  const [enabledDelivery, setEnabledDelivery] = useState({});

  useEffect(() => {
    const fetchLogosAndFees = async () => {
      // Group items by shopData.userId
      const groupedItems = items.reduce((groups, item) => {
        const shopId = item.shopData.userId;
        if (!groups[shopId]) {
          groups[shopId] = {
            shopName: item.shopData.name,
            logoPath: item.shopData.logo,
            items: [],
          };
        }
        groups[shopId].items.push(item);
        return groups;
      }, {});

      // Fetch logos and delivery fees for each shop
      const logoPromises = Object.entries(groupedItems).map(
        async ([shopId, group]) => {
          const url = await getImageDownloadUrl(group.logoPath);
          return [shopId, url];
        }
      );

      const feePromises = Object.keys(groupedItems).map(async (shopId) => {
        const userInfo = await getUserInfo(auth.currentUser.uid);
        const userRegion = userInfo?.location?.region;
        if (userRegion) {
          const fee = await getDeliveryFee(shopId, userRegion);
          return [shopId, fee];
        }
        return [shopId, null];
      });

      const resolvedLogos = await Promise.all(logoPromises);
      const resolvedFees = await Promise.all(feePromises);

      const logoUrlsMap = Object.fromEntries(resolvedLogos);
      const deliveryFeesMap = Object.fromEntries(resolvedFees);

      setLogoUrls(logoUrlsMap);
      setDeliveryFees(deliveryFeesMap);

      // Set enabledDelivery based on whether delivery is available for each shop
      setEnabledDelivery(
        Object.entries(deliveryFeesMap).reduce((acc, [shopId, fee]) => {
          acc[shopId] = fee !== null && fee >= 0; // Enable delivery only if fee is available
          return acc;
        }, {})
      );
    };

    fetchLogosAndFees();
  }, [items]);

  const checkStockAvailability = (item) => {
    if (!item.selectedVariant) {
      if (item.quantity >= item.stock) {
        console.log("Not enough stock available for the main item.");
        return false;
      } else {
        console.log("Stock is available for the main item.");
        return true;
      }
    } else {
      const selectedVariant = item.variants.find(
        (variant) => variant.name === item.selectedVariant
      );

      if (selectedVariant) {
        if (item.quantity >= selectedVariant.stock) {
          console.log(
            `Not enough stock available for variant: ${item.selectedVariant}.`
          );
          return false;
        } else {
          console.log(
            `Stock is available for variant: ${item.selectedVariant}.`
          );
          return true;
        }
      } else {
        console.log("Selected variant not found in the variants array.");
        return false;
      }
    }
  };

  const incrementQuantity = async (item) => {
    const stockAvailability = checkStockAvailability(item);
    console.log(stockAvailability);

    if (!stockAvailability) {
      toast.error(
        "Insufficient stock available for the selected item or variant. "
      );
      return;
    }

    const newQuantity = item.quantity + 1;

    // Update the quantity in Firebase
    await updateCartQuantity(
      auth.currentUser.uid,
      item.id,
      item.selectedVariant,
      item.shopData.userId,
      newQuantity
    );

    // Update the quantity in the local state
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedVariant === item.selectedVariant
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const decrementQuantity = async (item) => {
    const newQuantity = Math.max(1, item.quantity - 1);

    // Update the quantity in Firebase
    await updateCartQuantity(
      auth.currentUser.uid,
      item.id,
      item.selectedVariant,
      item.shopData.userId,
      newQuantity
    );

    // Update the quantity in the local state
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem.id === item.id &&
        cartItem.selectedVariant === item.selectedVariant
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };

  const monitorPaymentStatus = async (paymentId) => {
    let status = "pending";
    const interval = setInterval(async () => {
      status = await checkPaymentStatus(paymentId);
      console.log("Payment Status:", status);

      if (status) {
        await saveOrderToDatabase();
        clearInterval();
        return true;
      } else if (status) {
        console.log("Payment failed!");
        clearInterval();
      }
    }, 1000); // Poll every 5 seconds
  };

  const savePaymentOrder = async () => {
    let amount = 3000;
    let description = "Order Payment";
    const { checkoutUrl, paymentId } = await createPaymentLink({
      amount,
      description,
    });

    window.open(checkoutUrl, "_blank");

    console.log("Waiting for user to complete payment...");
    const isPaid = await monitorPaymentStatus(paymentId);
  };

  const saveOrderToDatabase = async () => {
    const allOrders = [];

    const groupedItems = items.reduce((groups, item) => {
      const shopId = item.shopData.userId;
      if (!groups[shopId]) {
        groups[shopId] = {
          shopName: item.shopData.name,
          items: [],
        };
      }
      groups[shopId].items.push(item);
      return groups;
    }, {});

    Object.entries(groupedItems).forEach(([shopId, group]) => {
      const orderTotal = group.items.reduce((total, item) => {
        const itemPrice = item.isSale ? item.discountedPrice : item.price;
        return total + itemPrice * item.quantity;
      }, 0);

      // Use the delivery fee based on the `enabledDelivery` state
      const deliveryFee = enabledDelivery[shopId]
        ? deliveryFees[shopId] || 0
        : 0;

      const orderData = {
        shopId,
        items: group.items,
        deliveryFee,
        orderTotal,
        deliveryEnabled: enabledDelivery[shopId],
        createdAt: new Date(),
      };

      allOrders.push(orderData);
    });
    const orderResult = await saveOrder(allOrders);
    if (orderResult) {
      const userId = auth.currentUser?.uid;
      const clearResult = await clearCart(userId);
      const stockResult = await updateStockFromOrder(allOrders);

      if (clearResult && stockResult) {
        window.location.reload();
      } else if (clearResult) {
        toast.error(
          "Order placed, but we encountered an issue updating stock."
        );
      } else {
        toast.error(
          "Order placed, but we encountered an issue clearing your cart."
        );
      }
    } else {
      toast.error("Unable to place your order. Please try again.");
    }
  };

  const groupedItems = Object.entries(
    items.reduce((groups, item) => {
      const shopId = item.shopData.userId;
      if (!groups[shopId]) {
        groups[shopId] = { shopName: item.shopData.name, items: [] };
      }
      groups[shopId].items.push(item);
      return groups;
    }, {})
  );

  const lastIndex = groupedItems.length - 1;

  return groupedItems.map(([shopId, group], index) => (
    <section key={shopId} className="flex flex-col gap-4 p-4 py-5">
      <div>
        <section className="flex items-center gap-2">
          <div className="w-16 h-16">
            <img
              src={logoUrls[shopId]}
              className="object-cover w-full h-full border rounded-full"
              alt={`${group.shopName} logo`}
            />
          </div>
          <span className="text-sm font-medium text-gray-900">
            {group.shopName}
          </span>
        </section>

        {/* Display items for each shop */}
        {group.items.map((item, index) => (
          <div className="my-4 rounded-lg" key={index}>
            <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <Link
                to={`/catalog/item/${toSlug(item.name)}/${item.id}`}
                className="shrink-0 md:order-1"
              >
                <img
                  className="object-cover border rounded-lg w-52 h-36"
                  src={item.variantImgUrls.imagePaths[0]}
                  alt={item.name}
                />
              </Link>

              {/* Quantity counter and price */}
              <label htmlFor="counter-input" className="sr-only">
                Choose quantity:
              </label>
              <div className="flex items-center justify-between md:order-3 md:justify-end">
                <div className="flex items-center">
                  <button
                    type="button"
                    id="decrement-button"
                    onClick={() => decrementQuantity(item)}
                    className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    <MinusIcon className="w-4 h-4 text-gray-900" />
                  </button>
                  <input
                    type="text"
                    id="counter-input"
                    className="w-10 text-sm font-medium text-center text-gray-900 bg-transparent border-0 shrink-0 focus:outline-none focus:ring-0 dark:text-white"
                    value={item.quantity}
                    required
                  />
                  <button
                    type="button"
                    id="increment-button"
                    onClick={() => incrementQuantity(item)}
                    className="inline-flex items-center justify-center w-5 h-5 bg-gray-100 border border-gray-300 rounded-md shrink-0 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
                  >
                    <PlusIcon className="w-4 h-4 text-gray-900" />
                  </button>
                </div>
                <div className="text-end md:order-4 md:w-32">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatToPeso(
                      (item.isSale ? item.discountedPrice : item.price) *
                        item.quantity
                    )}
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full min-w-0 space-y-2 md:order-2 ">
                <Link
                  to={`/catalog/item/${toSlug(item.name)}/${item.id}`}
                  className="text-sm font-medium text-gray-900 hover:underline dark:text-white"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-600">
                  {item.description?.length > 20
                    ? item.description.slice(0, 200) + "..."
                    : item.description}
                </p>
                <p className="text-sm text-gray-600">
                  {item.selectedVariant
                    ? `Variant: ${item.selectedVariant}`
                    : ""}
                </p>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900"
                    onClick={() => {
                      handleRemoveItem(
                        items,
                        item.id,
                        item.selectedVariant,
                        index,
                        item.shopData.userId
                      );
                    }}
                  >
                    <XMarkIcon className="w-5 h-5 me-1.5 " />
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Delivery Option Switch for each shop */}
        <div className="flex items-center mt-4">
          <span className="mr-2 text-sm font-normal text-gray-500">
            Delivery Option:
          </span>
          <Switch
            checked={enabledDelivery[shopId]}
            onChange={() =>
              setEnabledDelivery((prev) => ({
                ...prev,
                [shopId]: !prev[shopId],
              }))
            }
            className="group inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition data-[checked]:bg-arfagreen"
            disabled={deliveryFees[shopId] === null}
          >
            <span className="size-4 translate-x-1 rounded-full bg-white transition group-data-[checked]:translate-x-6" />
          </Switch>
          <span className="ml-2 text-sm font-normal text-gray-500">
            {enabledDelivery[shopId] ? "Delivery" : "Pick-up"}
          </span>
        </div>
        <span className="text-xs text-arfagreen">
          {deliveryFees[shopId] === null
            ? "Delivery service is not available in your location."
            : ""}
        </span>
        <span className="text-xs text-red-600">
          {deliveryFees[shopId] === 0
            ? "Enjoy free delivery on this order!"
            : ""}
        </span>
      </div>

      {index === lastIndex && (
        <>
          <hr />
          <div className="flex-1 max-w-3xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
            <div className="p-4 space-y-4 bg-white rounded-lg sm:p-6">
              <p className="text-base font-semibold text-gray-900 dark:text-white">
                Order Summary
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  {/* Display Original Price */}
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Original Price
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatToPeso(
                        items.reduce(
                          (total, item) =>
                            total +
                            (item.isSale ? item.discountedPrice : item.price) *
                              item.quantity,
                          0
                        )
                      )}
                    </dd>
                  </dl>

                  {/* Display Savings */}
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Savings
                    </dt>
                    <dd className="text-sm font-medium text-green-600">
                      -
                      {formatToPeso(
                        items.reduce(
                          (total, item) =>
                            total +
                            (item.isSale
                              ? item.price - item.discountedPrice
                              : 0) *
                              item.quantity,
                          0
                        )
                      )}
                    </dd>
                  </dl>

                  {/* Display Delivery Fees */}
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Delivery Fee
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatToPeso(
                        Object.entries(deliveryFees).reduce(
                          (total, [shopId, fee]) =>
                            total + (enabledDelivery[shopId] ? fee || 0 : 0),
                          0
                        )
                      )}
                    </dd>
                  </dl>

                  {/* Display Commission Rate */}
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      Commission Rate (5%)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900 dark:text-white">
                      {formatToPeso(
                        items.reduce(
                          (total, item) =>
                            total +
                            (item.isSale ? item.discountedPrice : item.price) *
                              item.quantity *
                              0.05,
                          0
                        )
                      )}
                    </dd>
                  </dl>
                </div>

                {/* Display Total */}
                <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <dt className="text-sm font-semibold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatToPeso(
                      items.reduce((total, item) => {
                        const price = item.isSale
                          ? item.discountedPrice
                          : item.price;
                        const itemTotal = price * item.quantity;
                        const itemTax = itemTotal * 0.05;
                        return total + itemTotal + itemTax;
                      }, 0) + // Close the first reduce function here
                        // Add the delivery fees to the final total based on each shop's delivery status
                        Object.entries(deliveryFees).reduce(
                          (total, [shopId, fee]) =>
                            total + (enabledDelivery[shopId] ? fee || 0 : 0),
                          0
                        )
                    )}
                  </dd>
                </dl>
              </div>

              <button
                onClick={savePaymentOrder}
                className="flex w-fit mx-auto bg-arfagreen items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
              >
                Proceed to Checkout
              </button>
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  or
                </span>
                <Link
                  to={"/catalog"}
                  className="inline-flex items-center gap-2 text-sm font-medium underline text-primary-700 hover:no-underline dark:text-primary-500"
                >
                  Continue Shopping
                  <ArrowLongRightIcon className="w-5 h-5 text-blue-600" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  ));
};

const Cart = () => {
  const tabsRef = useRef(null);
  const navigate = useNavigate();
  const changeTab = (tab) => {
    tab == 0 ? navigate("/wishlist") : navigate("/cart");
  };
  const [cart, setCart] = useState([]);
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const { cart } = await getUserInfo();

      const fetchPromises = cart.map(async (item) => {
        const furniture = await fetchFurnitureById(
          "furnitures",
          item.furnitureId
        );
        // grabbing lahat ng variants
        let variantImgUrls = "";
        if (
          furniture.variants.length === 0 ||
          (furniture.variants[0].imagePaths.length === 0 &&
            !furniture.variants[0].name)
        ) {
          const urls = await getAllImageDownloadUrl(furniture.imagesUrl);
          const placeholder = {
            imagePaths: urls,
            name: "",
          };
          variantImgUrls = placeholder;
        } else {
          variantImgUrls = furniture.variants.find((variant) => {
            return variant.name === item.variant;
          });
        }

        return {
          ...furniture,
          selectedVariant: item.variant,
          variantImgUrls: variantImgUrls,
          quantity: item.quantity,
        };
      });

      const results = await Promise.all(fetchPromises);
      setCart(results);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleRemoveItem = async (
    furnitures,
    furnitureId,
    variant,
    index,
    sellerId
  ) => {
    const userId = auth.currentUser?.uid;

    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    try {
      // Attempt to remove the item from Firebase
      const result = await removeFromCart(
        userId,
        furnitureId,
        variant,
        sellerId
      );

      if (result.success && result.isRemoved) {
        // Filter out the item at the specified index
        fetchCart();
        toast.success("Item removed from cart!");
      } else if (!result.isRemoved) {
        fetchCart();
        toast.error("Item was not in the cart.");
      }
    } catch (error) {
      toast.error("An error occurred while removing the item from the cart.");
      console.error("Error in handleRemoveItem:", error);
    }
  };
  return (
    <section className="antialiased dark:bg-gray-900">
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <Toaster />
      <div className="px-4 max-w-screen md:mx-8 2xl:px-0">
        <Tabs
          aria-label="Default tabs"
          variant="default"
          onActiveTabChange={changeTab}
          ref={tabsRef}
          className="cartWishlistTab text-arfablack"
        >
          <Tabs.Item title="Wishlist"></Tabs.Item>
          <Tabs.Item active title="Cart">
            <div className="flex items-center gap-2 py-5 text-sm text-arfablack">
              <Link
                to={"/catalog"}
                className="font-normal text-black cursor-pointer hover:text-arfagreen"
              >
                Catalog
              </Link>
              <img src={greaterthan} alt=">" className="w-2 h-2" />
              <span className="cursor-pointer hover:text-arfagreen">Cart</span>
            </div>
            {!cart || cart.length === 0 ? (
              <div className="flex flex-col items-center my-10">
                <img src={noWishlist} className="w-64 h-auto" />
                <p className="text-sm text-center">
                  Your cart is currently empty. Start adding items to your cart
                  now!
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white sm:text-2xl">
                  Shopping Cart
                </h2>
                {cart.length > 0 && cart.some((item) => item.modelUrl) ? (
                  <ShowMultiModel
                    data={cart
                      .filter((item) => item.modelUrl) // Filter items with modelUrl
                      .filter(
                        (item, index, self) =>
                          index ===
                          self.findIndex((i) => i.modelUrl === item.modelUrl) // Keep only unique modelUrl
                      )}
                  />
                ) : null}
                <div className=" mt-14 sm:mt-16 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  <div className="flex-none w-full mx-auto">
                    <div className="space-y-6">
                      <DisplayFurnituresOnCart
                        items={cart}
                        handleRemoveItem={handleRemoveItem}
                        fetchCart={fetchCart}
                        setCart={setCart}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </Tabs.Item>
        </Tabs>
      </div>
      <section className="mt-10">
        <FooterSection />
      </section>
    </section>
  );
};

export default Cart;
