import React from "react";
import NavigationBar from "../../components/navigation/NavigationBar";
import { ProfileSideBar } from "../../components/navigation/ProfileSideBar";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <section>
      <section className="mx-6 my-3">
        <NavigationBar />
      </section>
      <section className="flex">
        <ProfileSideBar />
        <Outlet />
      </section>
    </section>
  );
};

export default Profile;
