import React from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { FooterSection } from "../../components/navigation/FooterSection";
import { ProfileSideBar } from "../../components/navigation/ProfileSideBar";
import { Outlet } from "react-router-dom";
import filter from "../../assets/icons/filter.svg";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <section>
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <section>
        <button
          type="button"
          className="p-2 ml-4 -m-2 text-gray-400 bg-transparent bg-red-300 hover:border-transparent hover:text-gray-500 sm:ml-6 md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <span className="sr-only">Filters</span>
          <img src={filter} aria-hidden="true" className="w-5 h-5 " />
        </button>
        <Drawer open={isOpen} onClose={handleClose}>
          <ProfileSideBar setVisibility={setIsOpen} />
        </Drawer>
      </section>
      <section className="flex mb-10">
        <section className="hidden md:block">
          <ProfileSideBar />
        </section>
        <section className="flex-1 mt-5 border-l h-min">
          <Outlet />
        </section>
      </section>
      <section className="pt-4">
        <FooterSection />
      </section>
    </section>
  );
};

export default Profile;
