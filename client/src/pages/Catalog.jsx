import React from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import { FooterSection } from "../components/navigation/FooterSection";
import filter from "../assets/icons/filter.svg";
import toast, { Toaster } from "react-hot-toast";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  CheckIcon,
} from "@heroicons/react/20/solid";
import { NavLink, Outlet } from "react-router-dom";
import Breadcrumbs from "../components/dynamic/Breadcrumbs";
import { useStore } from "../stores/useStore";
import {
  sortOptions,
  subCategories,
  filters,
  classNames,
} from "../components/CatalogValues";
import FilterSortBar from "../components/dynamic/FilterSortBar";

const Catalog = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filters
  const isSaleOnly = useStore((state) => state.isSaleOnly);
  const updateIsSaleOnly = useStore((state) => state.updateIsSaleOnly);

  const isNewArrivalsOnly = useStore((state) => state.isNewArrivalsOnly);
  const updateIsNewArrivalsOnly = useStore(
    (state) => state.updateIsNewArrivalsOnly
  );

  // Default values ng min at max price
  const minP = useStore((state) => state.minPrice);
  const maxP = useStore((state) => state.maxPrice);

  const [minPrice, setMinPrice] = useState(minP);
  const updateMinPrice = useStore((state) => state.updateMinPrice);

  const [maxPrice, setMaxPrice] = useState(maxP);
  const updateMaxPrice = useStore((state) => state.updateMaxPrice);

  // Sorting
  const sortOption = useStore((state) => state.sortOption);
  const setSortOption = useStore((state) => state.setSortOption);

  const handlePriceRangeChange = (value, setState) => {
    if (value === "" || /^\d*$/.test(value)) {
      setState(value === "" ? null : Number(value));
    }
  };

  const handleCheckClick = () => {
    if (minPrice === null || maxPrice === null) {
      toast.error("Please enter both minimum and maximum prices.");
    } else if (minPrice === 0 || maxPrice === 0) {
      toast.error("Prices cannot be zero.");
    } else if (minPrice >= maxPrice) {
      toast.error("The minimum price must be less than the maximum price.");
    } else {
      updateMinPrice(minPrice);
      updateMaxPrice(maxPrice);
      toast.success("Price range updated successfully.");
    }
  };

  const handleSortChange = (value) => {
    setSortOption(value);
  };

  return (
    <>
      <section>
        <section className="mx-6 my-3">
          <NavigationBar />
        </section>
        <div className="">
          <div>
            {/* Mobile filter dialog */}
            <Dialog
              className="relative z-40 lg:hidden"
              open={mobileFiltersOpen}
              onClose={setMobileFiltersOpen}
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />

              <div className="fixed inset-0 z-40 flex">
                <DialogPanel
                  transition
                  className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                >
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md hover:border-transparent"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <NavLink
                            to={category.href}
                            onClick={() => setMobileFiltersOpen(false)}
                            className={({ isActive }) =>
                              isActive
                                ? "text-arfagreen block px-2 py-3 text-sm"
                                : "text-gray-900 hover:text-arfagreen block px-2 py-3 text-sm"
                            }
                          >
                            {category.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="px-4 py-6 border-t border-gray-200"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flow-root -mx-2 -my-3 ">
                              <DisclosureButton className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:border-transparent hover:text-gray-500">
                                <span className="text-lg font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="flex items-center ml-6">
                                  {open ? (
                                    <MinusIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value || option.label}
                                    className="flex items-center text-sm"
                                  >
                                    {/* Category Options (Smaller Screens) */}
                                    {section.id == "filter" ? (
                                      <>
                                        <input
                                          id={`filter-mobile-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          checked={
                                            option.value === "new-arrivals"
                                              ? isNewArrivalsOnly
                                              : option.value === "sale"
                                              ? isSaleOnly
                                              : option.checked
                                          }
                                          onChange={(e) => {
                                            const value = e.target.checked;
                                            if (
                                              option.value === "new-arrivals"
                                            ) {
                                              updateIsNewArrivalsOnly(value);
                                            } else if (
                                              option.value === "sale"
                                            ) {
                                              updateIsSaleOnly(value);
                                            }
                                          }}
                                          className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
                                        />
                                        <label
                                          htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                          className="flex-1 min-w-0 ml-3 text-gray-500"
                                        >
                                          {option.label}
                                        </label>
                                      </>
                                    ) : null}

                                    {/* Pricing (Smaller Screens) */}
                                    {section.id == "pricing" ? (
                                      <>
                                        {option.label != "searchPrice" ? (
                                          <input
                                            type="text"
                                            className="w-full text-sm border border-gray-300 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white "
                                            placeholder={`${option.label}`}
                                            value={
                                              option.label === "From"
                                                ? minPrice === null
                                                  ? ""
                                                  : minPrice
                                                : maxPrice === null
                                                ? ""
                                                : maxPrice
                                            }
                                            onChange={(e) => {
                                              if (option.label == "From") {
                                                handlePriceRangeChange(
                                                  e.target.value,
                                                  setMinPrice
                                                );
                                              } else if (option.label == "To") {
                                                handlePriceRangeChange(
                                                  e.target.value,
                                                  setMaxPrice
                                                );
                                              }
                                            }}
                                          />
                                        ) : (
                                          <CheckIcon
                                            className="w-4 h-4 ml-auto mr-1 text-gray-400 cursor-pointer hover:text-gray-500"
                                            aria-hidden="true"
                                            onClick={handleCheckClick}
                                          />
                                        )}
                                      </>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </div>
            </Dialog>

            <main className="max-w-full px-4 mx-auto sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between pt-5 pb-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Catalog
                </h1>
                <div className="flex items-center">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <MenuButton className="inline-flex justify-center text-sm font-medium text-gray-700 bg-transparent hover:border-transparent group hover:text-gray-900">
                        Sort by
                        <ChevronDownIcon
                          className="flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </MenuButton>
                    </div>

                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <MenuItem key={option.name}>
                            {({ focus }) => (
                              <span
                                href={option.href}
                                onClick={() => handleSortChange(option.value)}
                                className={classNames(
                                  option.current
                                    ? "font-medium "
                                    : "text-gray-500",
                                  focus
                                    ? "bg-gray-100 hover:text-arfagreen"
                                    : "",
                                  `block px-4 py-2 text-sm hover:text-arfagreen cursor-pointer ${
                                    sortOption == option.value
                                      ? "text-arfagreen font-semibold"
                                      : "text-gray-900"
                                  }`
                                )}
                              >
                                {option.name}
                              </span>
                            )}
                          </MenuItem>
                        ))}
                      </div>
                    </MenuItems>
                  </Menu>
                  <button
                    type="button"
                    className="p-2 ml-4 -m-2 text-gray-400 bg-transparent hover:border-transparent hover:text-gray-500 sm:ml-6 lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                  >
                    <span className="sr-only">Filters</span>
                    <img src={filter} aria-hidden="true" className="w-5 h-5 " />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pt-6 pb-24"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden pr-8 lg:block">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200"
                    >
                      {subCategories.map((category) => (
                        <li key={category.name}>
                          <NavLink
                            to={category.href}
                            className={({ isActive }) =>
                              isActive
                                ? "text-arfagreen"
                                : "text-gray-900 hover:text-arfagreen"
                            }
                          >
                            {category.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="py-6 border-b border-gray-200"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="flow-root -my-3">
                              <DisclosureButton className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:border-transparent hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="flex items-center ml-6">
                                  {open ? (
                                    <MinusIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <PlusIcon
                                      className="w-5 h-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </DisclosureButton>
                            </h3>
                            <DisclosurePanel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value || option.label}
                                    className="flex items-center"
                                  >
                                    {/* Category Options (larger Screens)*/}
                                    {section.id == "filter" ? (
                                      <>
                                        <input
                                          id={`filter-${section.id}-${optionIdx}`}
                                          name={`${section.id}[]`}
                                          defaultValue={option.value}
                                          type="checkbox"
                                          checked={
                                            option.value === "new-arrivals"
                                              ? isNewArrivalsOnly
                                              : option.value === "sale"
                                              ? isSaleOnly
                                              : option.checked
                                          }
                                          onChange={(e) => {
                                            const value = e.target.checked;
                                            if (
                                              option.value === "new-arrivals"
                                            ) {
                                              updateIsNewArrivalsOnly(value);
                                            } else if (
                                              option.value === "sale"
                                            ) {
                                              updateIsSaleOnly(value);
                                            }
                                          }}
                                          className="w-4 h-4 border-gray-300 rounded text-arfagreen focus:ring-arfagreen"
                                        />
                                        <label
                                          htmlFor={`filter-${section.id}-${optionIdx}`}
                                          className="ml-3 text-sm text-gray-600"
                                        >
                                          {option.label}
                                        </label>
                                      </>
                                    ) : null}

                                    {/* Pricing (Larger Screens)*/}
                                    {section.id == "pricing" ? (
                                      <>
                                        {option.label != "searchPrice" ? (
                                          <input
                                            type="text"
                                            className="w-full text-sm border border-gray-300 focus:outline-none focus:border-arfagreen focus:ring-0 focus:ring-arfagreen focus:bg-white "
                                            placeholder={`${option.label}`}
                                            value={
                                              option.label === "From"
                                                ? minPrice === null
                                                  ? ""
                                                  : minPrice
                                                : maxPrice === null
                                                ? ""
                                                : maxPrice
                                            }
                                            onChange={(e) => {
                                              if (option.label == "From") {
                                                handlePriceRangeChange(
                                                  e.target.value,
                                                  setMinPrice
                                                );
                                              } else if (option.label == "To") {
                                                handlePriceRangeChange(
                                                  e.target.value,
                                                  setMaxPrice
                                                );
                                              }
                                            }}
                                          />
                                        ) : (
                                          <CheckIcon
                                            className="w-4 h-4 ml-auto mr-1 text-gray-400 cursor-pointer hover:text-gray-500"
                                            aria-hidden="true"
                                            onClick={handleCheckClick}
                                          />
                                        )}
                                      </>
                                    ) : null}
                                  </div>
                                ))}
                              </div>
                            </DisclosurePanel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                  <Toaster />

                  {/* This is where the content (side side) will be displayed*/}
                  <main className="lg:border-l lg:col-span-3">
                    <Breadcrumbs />
                    <div className="pb-4 md:pl-8">
                      <FilterSortBar />
                    </div>
                    <Outlet />
                  </main>
                </div>
              </section>
            </main>
          </div>
        </div>
        <section>
          <FooterSection></FooterSection>
        </section>
      </section>
    </>
  );
};

export default Catalog;
