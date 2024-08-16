import React from "react";
import SellerNavigationBar from "../../components/navigation/SellerNavigationBar";
import { SellerSideBar } from "../../components/navigation/SellerSideBar";
import { ProfileSideBar } from "../../components/navigation/ProfileSideBar";
import { Outlet } from "react-router-dom";
import { FooterSection } from "../../components/navigation/FooterSection";
const SellerLayout = () => {
  return (
    <section className="bg-gray-50">
      <section className="bg-white shadow-sm">
        <SellerNavigationBar />
      </section>

      <section className="flex mb-10">
        <section className="bg-white shadow-sm w-fit ">
          <SellerSideBar></SellerSideBar>
        </section>
        <section className="flex-1 border-l">
          <Outlet />
        </section>
      </section>
      <section className="pt-4">
        <FooterSection />
      </section>
    </section>
  );
};

export default SellerLayout;
