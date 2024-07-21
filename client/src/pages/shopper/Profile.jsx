import React from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { FooterSection } from "../../components/navigation/FooterSection";
import { ProfileSideBar } from "../../components/navigation/ProfileSideBar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section>
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <section className="flex mb-10">
        <ProfileSideBar />
        <section className="flex-1 mt-5 border-l">
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
