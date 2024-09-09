import React, { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";
import {
  QuestionMarkCircleIcon,
  PhoneIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { getUserInfo } from "../../firebase/user";
import { getImageDownloadUrl } from "../../firebase/photos";
import { useStore } from "../../stores/useStore";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { useCallback } from "react";

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const { loggedUser: user, setLoggedUser: setUser } = useStore();
  const { profileUrl, setProfileUrl } = useStore();
  const [editForm, setEditForm] = useState(false);

  // States for form fields

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [barangay, setBarangay] = useState([]);
  const [cityMunicipal, setCityMunicipal] = useState([]);
  const [province, setProvince] = useState([]);
  const [region, setRegion] = useState([]);

  // State to hold the selected value for each dropdown
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedCityMunicipal, setSelectedCityMunicipal] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const fetchUserInfo = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getUserInfo();
      setUser(result);

      // Set form fields after fetching user data
      setFirstName(result.firstName);
      setLastName(result.lastName);
      setPhoneNumber(result.phoneNumber);
      setStreetNumber(result.location.street);
      setBarangay(result.location.barangay);
      setCityMunicipal(result.location.city);
      setProvince(result.location.province);
      if (result.location.region) {
        setRegion(result.location.region);
      } else {
        const fetchAddress = async () => {
          const reg = await regions();
          setRegion(reg);
          console.log(reg);
        };

        fetchAddress();
      }

      const profileImageUrl = await getImageDownloadUrl(result.profileUrl);
      setProfileUrl(profileImageUrl);
    } catch (error) {
      console.error("Error fetching logged user: ", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [setUser, setProfileUrl]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(selectedRegion);
  };

  const handleCancelBtn = async () => {
    setEditForm(false);
    fetchUserInfo();
  };

  if (loading && !user) return <div>Loadingg..</div>;

  return (
    <>
      <section className="px-4 md:px-8">
        <div className="font-medium">Profile Information</div>
        <form
          className="w-full px-4 py-5 mx-auto mt-5 border md:px-8"
          onSubmit={handleFormSubmit}
        >
          <section className="flex flex-col items-center gap-3 lg:items-end lg:flex-row">
            <div className="w-auto h-96">
              <img
                src={profileUrl}
                alt="profile image"
                className="object-cover w-full h-full"
              />
            </div>
            <section className="w-full gap-3 md:flex-1">
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
                className={`block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen ${
                  !editForm ? "cursor-not-allowed" : ""
                }`}
                disabled={editForm ? false : true}
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
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={editForm ? false : true}
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
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={editForm ? false : true}
                />
              </div>
            </div>
          </section>

          <section className="grid items-center justify-center grid-cols-2 gap-3 mt-3 mb-3 sm:grid-cols-3">
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
                  value={phoneNumber}
                  onChange={(e) => {
                    const input = e.target.value;
                    const numbers = "0123456789";
                    if (
                      input.split("").every((char) => numbers.includes(char))
                    ) {
                      setPhoneNumber(input);
                    }
                  }}
                  className={`rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-arfagreen focus:border-arfagreen block flex-1 min-w-0 w-full text-sm p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                  placeholder="09123456789"
                  required
                  maxLength={11}
                  disabled={editForm ? false : true}
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
              {Array.isArray(region) ? (
                <select
                  name="region"
                  id="region"
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                  onChange={async (e) => {
                    const province = await provinces(e.target.value);
                    setProvince(province);
                    setSelectedRegion(
                      e.target.options[e.target.selectedIndex].text
                    );

                    setCityMunicipal([]);
                    setBarangay([]);
                    setStreetNumber("");
                  }}
                  disabled={editForm ? false : true}
                >
                  <option
                    value=""
                    onClick={() => {
                      setCityMunicipal([]);
                      setBarangay([]);
                      setStreetNumber("");
                    }}
                  >
                    Select Region
                  </option>
                  {region.map((reg) => {
                    return (
                      <option value={reg.region_code}>{reg.region_name}</option>
                    );
                  })}
                </select>
              ) : (
                <section
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">{region}</option>
                </section>
              )}
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
              {Array.isArray(province) ? (
                <select
                  name="province"
                  id="province"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    const cityMunicipal = await cities(e.target.value);
                    setCityMunicipal(cityMunicipal);
                    setSelectedProvince(
                      e.target.options[e.target.selectedIndex].text
                    );

                    setBarangay([]);
                    setStreetNumber("");
                  }}
                  disabled={editForm ? false : true}
                >
                  <option
                    value=""
                    onClick={() => {
                      setBarangay([]);
                      setStreetNumber("");
                    }}
                  >
                    Select Province
                  </option>
                  {province.map((reg) => {
                    return (
                      <option value={reg.province_code}>
                        {reg.province_name}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <section
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">{province || "Select Province"}</option>
                </section>
              )}
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
              {Array.isArray(cityMunicipal) ? (
                <select
                  name="citymunicipal"
                  id="citymunicipal"
                  className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    const barangay = await barangays(e.target.value);
                    setBarangay(barangay);
                    setSelectedCityMunicipal(
                      e.target.options[e.target.selectedIndex].text
                    );

                    setStreetNumber("");
                  }}
                  disabled={editForm ? false : true}
                >
                  <option
                    value=""
                    onClick={() => {
                      setStreetNumber("");
                    }}
                  >
                    Select City/Municipal
                  </option>
                  {cityMunicipal.map((reg) => {
                    return (
                      <option value={reg.city_code}>{reg.city_name}</option>
                    );
                  })}
                </select>
              ) : (
                <section
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">
                    {cityMunicipal || "Select City/Municipal"}
                  </option>
                </section>
              )}
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
              {Array.isArray(barangay) ? (
                <select
                  name="barangay"
                  id="barangay"
                  className="border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                  onChange={async (e) => {
                    setSelectedBarangay(
                      e.target.options[e.target.selectedIndex].text
                    );
                    setStreetNumber("");
                  }}
                  disabled={editForm ? false : true}
                >
                  <option
                    value=""
                    onClick={() => {
                      setStreetNumber("");
                    }}
                  >
                    Select Barangay
                  </option>
                  {barangay.map((reg) => {
                    return (
                      <option value={reg.brgy_code}>{reg.brgy_name}</option>
                    );
                  })}
                </select>
              ) : (
                <section
                  className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                    !editForm ? "cursor-not-allowed" : ""
                  }`}
                >
                  <option value="">{barangay || "Select Barangay"}</option>
                </section>
              )}
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
                value={streetNumber || ""}
                onChange={(e) => setStreetNumber(e.target.value)}
                className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                  !editForm ? "cursor-not-allowed" : ""
                }`}
                required
                disabled={editForm ? false : true}
              />
            </div>
          </section>

          {!editForm && (
            <button
              className="text-white flex-1 bg-arfagreen font-medium rounded-md text-sm w-full sm:w-auto px-7 py-2.5 text-center "
              onClick={() => setEditForm(true)}
            >
              Edit
            </button>
          )}

          {editForm && (
            <>
              <div className="flex gap-3 w-fit">
                <button
                  className="text-white flex-1 bg-arfagreen font-medium rounded-md text-sm w-full sm:w-auto px-7 py-2.5 text-center "
                  type="submit"
                >
                  Save
                </button>
                <button
                  className=" flex-1 border text-black border-gray-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                  onClick={handleCancelBtn}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </>
  );
};

export default UserProfile;
