import React from "react";
import SellerNavigationBar from "../../components/navigation/SellerNavigationBar";
import { SellerSideBar } from "../../components/navigation/SellerSideBar";
import { ProfileSideBar } from "../../components/navigation/ProfileSideBar";
import { Outlet } from "react-router-dom";
import { FooterSection } from "../../components/navigation/FooterSection";
const SellerLayout = () => {
  return (
    <section className="bg-gray-50">
      <section className="bg-white border-b border-gray-300">
        <SellerNavigationBar />
      </section>

      <section className="flex mb-10">
        <section className="bg-white border-r border-gray-300 w-fit">
          <SellerSideBar></SellerSideBar>
        </section>
        <section className="flex-1 ">
          <Outlet />
        </section>
      </section>
    </section>
  );
};

export default SellerLayout;
