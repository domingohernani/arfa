import React from "react";
import SellerNavigationBar from "../../components/navigation/SellerNavigationBar";
import { SellerSideBar } from "../../components/navigation/SellerSideBar";
import { ProfileSideBar } from "../../components/navigation/ProfileSideBar";
import { Outlet } from "react-router-dom";
import { FooterSection } from "../../components/navigation/FooterSection";
import { Button, Drawer } from "flowbite-react";
import { useState } from "react";
import filter from "../../assets/icons/filter.svg";

const SellerLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <section className="bg-white">
      <section className="bg-white border-b border-gray-300">
        <SellerNavigationBar />
      </section>

      <section className="my-3 md:hidden">
        <button
          type="button"
          className="p-2 ml-4 -m-2 text-gray-400 bg-transparent rounded-md e hover:border-transparent hover:text-gray-500 sm:ml-6 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <img src={filter} aria-hidden="true" className="w-5 h-5 " />
        </button>
        <Drawer open={isOpen} onClose={handleClose}>
          <SellerSideBar setIsOpen={setIsOpen}></SellerSideBar>
        </Drawer>
      </section>

      <section className="flex md:mb-10">
        <section className="hidden bg-white border-r border-gray-300 w-fit md:block">
          <SellerSideBar></SellerSideBar>
        </section>
        <section className="flex-1 ">
          <Outlet />
        </section>
      </section>

      <section>
        <FooterSection></FooterSection>
      </section>
    </section>
  );
};

export default SellerLayout;
