import React from "react";
import NavigationBar from "../components/navigation/NavigationBar";
import filter from "../assets/icons/filter.svg";
import greaterthan from "../assets/icons/greater-than.svg";

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
} from "@heroicons/react/20/solid";
import { NavLink, Outlet } from "react-router-dom";

const sortOptions = [
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

const subCategories = [
  { name: "Living Room", href: "living-room" },
  { name: "Bedroom", href: "bedroom" },
  { name: "Dining Room", href: "dining-room" },
  { name: "Office", href: "office" },
  { name: "Outdoor", href: "outdoor" },
  { name: "Accent", href: "accent" },
  { name: "Storage", href: "storage" },
  { name: "Entryway", href: "entryway" },
];

const filters = [
  {
    id: "filter",
    name: "Filter",
    options: [
      { value: "new-arrivals", label: "New Arrivals", checked: false },
      { value: "sale", label: "Sale", checked: false },
    ],
  },
  {
    id: "pricing",
    name: "Pricing",
    options: [
      { value: "testing low", label: "From", checked: false },
      { value: "testing high", label: "To", checked: false },
      { label: "searchPrice" },
    ],
  },
];

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

const Catalog = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

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
                          <a
                            href={category.href}
                            className="block px-2 py-3 text-sm text-gray-900 hover:text-arfagreen"
                          >
                            {category.name}
                          </a>
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
                                          defaultChecked={option.checked}
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
                                          />
                                        ) : (
                                          <button
                                            type="button"
                                            className="p-1 ml-auto rounded-sm bg-arfagreen"
                                          >
                                            <svg
                                              className="w-4 h-auto "
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="white"
                                              id="Outline"
                                              viewBox="0 0 24 24"
                                              width="512"
                                              height="512"
                                            >
                                              <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
                                            </svg>
                                          </button>
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
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  focus
                                    ? "bg-gray-100 hover:text-arfagreen"
                                    : "",
                                  "block px-4 py-2 text-sm hover:text-arfagreen"
                                )}
                              >
                                {option.name}
                              </a>
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
                                          defaultChecked={option.checked}
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
                                          />
                                        ) : (
                                          <button
                                            type="button"
                                            className="p-1 ml-auto rounded-sm bg-arfagreen"
                                          >
                                            <svg
                                              className="w-4 h-auto "
                                              xmlns="http://www.w3.org/2000/svg"
                                              fill="white"
                                              id="Outline"
                                              viewBox="0 0 24 24"
                                              width="512"
                                              height="512"
                                            >
                                              <path d="M23.707,22.293l-5.969-5.969a10.016,10.016,0,1,0-1.414,1.414l5.969,5.969a1,1,0,0,0,1.414-1.414ZM10,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,10,18Z" />
                                            </svg>
                                          </button>
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

                  {/* This is where the content (side side) will be displayed*/}
                  <main className="lg:col-span-3">
                    <div className="max-w-md">
                      <div className="flex items-center gap-2 text-sm lg:pl-8 md:pl-4 text-arfablack">
                        <span className="cursor-pointer hover:text-arfagreen">
                          Home
                        </span>
                        <img src={greaterthan} alt=">" className="w-2 h-2" />
                        <span className="cursor-pointer hover:text-arfagreen">
                          Catalog
                        </span>
                      </div>
                    </div>
                    <Outlet />
                  </main>
                </div>
              </section>
            </main>
          </div>
        </div>
        {/* <section className="mx-6 my-3">
        </section> */}
      </section>
    </>
  );
};

export default Catalog;
