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
import { removeFromCart } from "../../firebase/cart";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "../../firebase/firebase";
import {
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import { updateCartQuantity } from "../../firebase/delivery";

const DisplayFurnituresOnCart = ({
  items,
  handleRemoveItem,
  fetchCart,
  setCart,
}) => {
  const [logoUrls, setLogoUrls] = useState({});

  useEffect(() => {
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

    // Fetch logos for each shop
    const fetchLogos = async () => {
      const logoPromises = Object.entries(groupedItems).map(
        async ([shopId, group]) => {
          const url = await getImageDownloadUrl(group.logoPath);
          return [shopId, url];
        }
      );

      const resolvedLogos = await Promise.all(logoPromises);
      const logoUrlsMap = Object.fromEntries(resolvedLogos);
      setLogoUrls(logoUrlsMap);
    };

    fetchLogos();
  }, [items]);

  const incrementQuantity = async (item) => {
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

  // Render the grouped items
  return Object.entries(
    items.reduce((groups, item) => {
      const shopId = item.shopData.userId;
      if (!groups[shopId]) {
        groups[shopId] = { shopName: item.shopData.name, items: [] };
      }
      groups[shopId].items.push(item);
      return groups;
    }, {})
  ).map(([shopId, group]) => (
    <section key={shopId} className="flex gap-4 p-4 py-5 border">
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
                    {item.isSale
                      ? formatToPeso(item.discountedPrice)
                      : formatToPeso(item.price)}
                  </p>
                </div>
              </div>

              <div className="flex-1 w-full min-w-0 space-y-2 md:order-2 md:max-w-md">
                <Link
                  to={`/catalog/item/${toSlug(item.name)}/${item.id}`}
                  className="text-sm font-medium text-gray-900 hover:underline dark:text-white"
                >
                  {item.name}
                </Link>
                <p className="text-sm text-gray-600">
                  {item.description?.length > 20
                    ? item.description.slice(0, 100) + "..."
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
                      fetchCart();
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
      </div>
      {/* Order summary and checkout button can go here */}
      <div className="flex-1 max-w-4xl mx-auto mt-6 space-y-6 lg:mt-0 lg:w-full">
        <div className="p-4 space-y-4 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
          <p className="text-xl font-semibold text-gray-900 dark:text-white">
            Order summary
          </p>

          <div className="space-y-4">
            <div className="space-y-2">
              <dl className="flex items-center justify-between gap-4">
                <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Original price
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  $7,592.00
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Savings
                </dt>
                <dd className="text-sm font-medium text-green-600">-$299.00</dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Delivery Fee
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  $99
                </dd>
              </dl>

              <dl className="flex items-center justify-between gap-4">
                <dt className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Tax
                </dt>
                <dd className="text-sm font-medium text-gray-900 dark:text-white">
                  $799
                </dd>
              </dl>
            </div>

            <dl className="flex items-center justify-between gap-4 pt-2 border-t border-gray-200 dark:border-gray-700">
              <dt className="text-sm font-bold text-gray-900 dark:text-white">
                Total
              </dt>
              <dd className="text-sm font-bold text-gray-900 dark:text-white">
                $8,191.00
              </dd>
            </dl>
          </div>

          <a
            href="#"
            className="flex w-full bg-arfagreen items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800"
          >
            Proceed to Checkout
          </a>
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
    try {
      const result = await removeFromCart(
        userId,
        furnitureId,
        variant,
        sellerId
      );

      if (result.success && result.isRemoved) {
        const newCart = furnitures.filter((_, i) => i !== index);
        setCart(newCart);
        toast.success("Item removed from cart!");
      } else if (!result.isRemoved) {
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
