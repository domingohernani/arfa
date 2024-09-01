import React from "react";
import { Tooltip } from "flowbite-react";
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

const UserProfile = () => {
  return (
    <>
      <section className="px-4 md:px-8">
        <div className="">
          <div className="font-semibold">Profile Information</div>
        </div>
        <form className="w-full px-8 py-5 mx-auto mt-5 border">
          <section className="flex items-end gap-3">
            <div className="w-96 h-96">
              <img
                src="https://plus.unsplash.com/premium_photo-1673448391005-d65e815bd026?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGhvdG98ZW58MHx8MHx8fDA%3D"
                alt="profile image"
                className="object-cover w-full h-full"
              />
            </div>
            <section className="flex-1 gap-3 ">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="ownerid"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Upload Profile Picture
                </label>
                <Tooltip content="Accepted formats: JPG, PNG, or GIF Only">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <input
                type="file"
                id="ownerid"
                className="block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen"
                required
              />
            </section>
          </section>
          <section className="flex gap-3 mt-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Firstname
                </label>
                <Tooltip content="Enter your first name as it appears on official documents">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="password"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Lastname
                </label>
                <Tooltip content="Enter your last name as it appears on official documents">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="confirmpassword"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  required
                />
              </div>
            </div>
          </section>

          <section className="grid items-center justify-center grid-cols-2 gap-3 mb-3 sm:grid-cols-3">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="phonenumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone number
                </label>
                <Tooltip content="Provide a contact number where customers can reach you">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <div className="flex">
                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                  <PhoneIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                </span>
                <input
                  type="text"
                  id="phonenumber"
                  // value={phoneNumber}
                  // onChange={(e) => {
                  //   const input = e.target.value;
                  //   const numbers = "0123456789";
                  //   if (
                  //     input.split("").every((char) => numbers.includes(char))
                  //   ) {
                  //     setPhoneNumber(input);
                  //   }
                  // }}
                  className="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5"
                  placeholder="09123456789"
                  required
                  maxLength={11}
                />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="region"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Region
                </label>
                <Tooltip content="Enter your Region">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <select
                name="region"
                id="region"
                className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                // onChange={async (e) => {
                //   const province = await provinces(e.target.value);
                //   setProvince(province);
                //   setSelectedRegion(
                //     e.target.options[e.target.selectedIndex].text
                //   );

                //   setCityMunicipal([]);
                //   setBarangay([]);
                //   setStreetNumber("");
                // }}
              >
                <option
                  value=""
                  // onClick={() => {
                  //   setCityMunicipal([]);
                  //   setBarangay([]);
                  //   setStreetNumber("");
                  // }}
                >
                  Select Region
                </option>
                {/* {region.map((reg) => {
                    return (
                      <option value={reg.region_code}>{reg.region_name}</option>
                    );
                  })} */}
              </select>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="province"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Province
                </label>
                <Tooltip content="Enter your Province">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <select
                name="province"
                id="province"
                className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                // onChange={async (e) => {
                //   const cityMunicipal = await cities(e.target.value);
                //   setCityMunicipal(cityMunicipal);
                //   setSelectedProvince(
                //     e.target.options[e.target.selectedIndex].text
                //   );

                //   setBarangay([]);
                //   setStreetNumber("");
                // }}
              >
                <option
                // value=""
                // onClick={() => {
                //   setBarangay([]);
                //   setStreetNumber("");
                // }}
                >
                  Select Province
                </option>
                {/* {province.map((reg) => {
                    return (
                      <option value={reg.province_code}>
                        {reg.province_name}
                      </option>
                    );
                  })} */}
              </select>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="citymunicipal"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City/Municipal
                </label>
                <Tooltip content="Enter your City or Municipal">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <select
                name="citymunicipal"
                id="citymunicipal"
                className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                // onChange={async (e) => {
                //   const barangay = await barangays(e.target.value);
                //   setBarangay(barangay);
                //   setSelectedCityMunicipal(
                //     e.target.options[e.target.selectedIndex].text
                //   );

                //   setStreetNumber("");
                // }}
              >
                <option
                  value=""
                  // onClick={() => {
                  //   setStreetNumber("");
                  // }}
                >
                  Select City/Municipal
                </option>
                {/* {cityMunicipal.map((reg) => {
                    return (
                      <option value={reg.city_code}>{reg.city_name}</option>
                    );
                  })} */}
              </select>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="barangay"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Barangay
                </label>
                <Tooltip content="Enter your Barangay">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <select
                name="barangay"
                id="barangay"
                className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                // onChange={async (e) => {
                //   setSelectedBarangay(
                //     e.target.options[e.target.selectedIndex].text
                //   );
                //   setStreetNumber("");
                // }}
              >
                <option
                  value=""
                  // onClick={() => {
                  //   setStreetNumber("");
                  // }}
                >
                  Select Barangay
                </option>
                {/* {barangay.map((reg) => {
                    return (
                      <option value={reg.brgy_code}>{reg.brgy_name}</option>
                    );
                  })} */}
              </select>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="streetnumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Street
                </label>
                <Tooltip content="Enter your street number">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </div>
              <input
                type="text"
                id="streetnumber"
                // value={streetNumber}
                // onChange={(e) => setStreetNumber(e.target.value)}
                className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                required
              />
            </div>
          </section>

          <button
            type="submit"
            class="text-white bg-arfagreen font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
          >
            Save
          </button>
        </form>
      </section>
    </>
  );
};

export default UserProfile;
