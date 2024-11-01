import React, { useCallback, useEffect, useState } from "react";
import {
  getShopInfo,
  updateAddress,
  updateBrandName,
  updateBusinessPermit,
  updateLogo,
  updateValidID,
} from "../../../firebase/shop";
import { auth } from "../../../firebase/firebase";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { Tooltip } from "flowbite-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";
import { getImageDownloadUrl } from "../../../firebase/photos";
import toast from "react-hot-toast";

export const SellerUserProfile = () => {
  const [shopName, setShopName] = useState("");
  const [businessPermit, setBusinessPermit] = useState("");
  const [validId, setValidId] = useState("");
  const [regionOptions, setRegionOptions] = useState([]);
  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [barangayOptions, setBarangayOptions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedBarangay, setSelectedBarangay] = useState("");
  const [selectedRegionName, setSelectedRegionName] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");
  const [selectedBarangayName, setSelectedBarangayName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [editForm, setEditForm] = useState(false);

  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

  const fetchLogo = useCallback(async (path) => {
    const logoUrl = await getImageDownloadUrl(path);
    return logoUrl;
  });

  const fetchShopInfo = useCallback(async () => {
    if (!userId) return;

    setLoading(true);
    try {
      const result = await getShopInfo(userId);
      if (result) {
        setShopName(result.name);
        setBusinessPermit(result.businessPermit);
        setValidId(result.validId);
        setSelectedRegion(result.address?.region || "");
        setSelectedProvince(result.address?.province || "");
        setSelectedCity(result.address?.city || "");
        setSelectedBarangay(result.address?.barangay || "");
        setStreetNumber(result.address?.street || "");

        setSelectedRegionName(result.address?.region || "");
        setSelectedProvinceName(result.address?.province || "");
        setSelectedCityName(result.address?.city || "");
        setSelectedBarangayName(result.address?.street || "");

        setProfilePreview(await fetchLogo(result.logo));

        const reg = await regions();
        setRegionOptions(reg);
      } else {
        console.error("No shop info found for the logged user.");
      }
    } catch (error) {
      console.error("Error fetching shop info:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchShopInfo();
    }
  }, [userId, fetchShopInfo]);

  const handleRegionChange = async (e) => {
    const regionCode = e.target.value;
    const regionName = e.target.options[e.target.selectedIndex].text;
    setSelectedRegion(regionCode);
    setSelectedRegionName(regionName);
    setSelectedProvince("");
    setSelectedCity("");
    setSelectedBarangay("");
    setProvinceOptions([]);
    setCityOptions([]);
    setBarangayOptions([]);

    const provincesData = await provinces(regionCode);
    setProvinceOptions(provincesData);
  };

  const handleProvinceChange = async (e) => {
    const provinceCode = e.target.value;
    const provinceName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvince(provinceCode);
    setSelectedProvinceName(provinceName);
    setSelectedCity("");
    setSelectedBarangay("");
    setCityOptions([]);
    setBarangayOptions([]);

    const citiesData = await cities(provinceCode);
    setCityOptions(citiesData);
  };

  const handleCityChange = async (e) => {
    const cityCode = e.target.value;
    const cityName = e.target.options[e.target.selectedIndex].text;
    setSelectedCity(cityCode);
    setSelectedCityName(cityName);
    setSelectedBarangay("");
    setBarangayOptions([]);

    const barangaysData = await barangays(cityCode);
    setBarangayOptions(barangaysData);
  };

  const handleBarangayChange = (e) => {
    const barangayCode = e.target.value;
    const barangayName = e.target.options[e.target.selectedIndex].text;
    setSelectedBarangay(barangayCode);
    setSelectedBarangayName(barangayName);
  };

  const handleCancelBtn = () => {
    setEditForm(false);
    setProfile(null);
    setProfilePreview("");
    fetchShopInfo();
  };

  const handleSaveBtn = async (e) => {
    e.preventDefault();

    // brandname
    const resultBrandName = await updateBrandName(userId, shopName);

    // Business Permit
    if (
      businessPermit &&
      businessPermit.size > 0 &&
      businessPermit.type === "application/pdf"
    ) {
      await updateBusinessPermit(userId, businessPermit);
    }

    // Valid ID
    if (validId && validId.size > 0 && validId.type === "application/pdf") {
      await updateValidID(userId, validId);
    }

    // address
    const address = {
      selectedRegionName,
      selectedProvinceName,
      selectedCityName,
      selectedBarangayName,
      streetNumber,
    };
    const resultAddress = await updateAddress(userId, address);

    // logo
    if (profile) {
      await updateLogo(userId, profile);
    }

    if (resultAddress && resultBrandName) {
      fetchShopInfo();
      toast.success("Shop information updated successfully.");
    } else {
      toast.error("Failed to update shop information. Please try again.");
    }

    setEditForm(false);
  };

  const handleFileChange =
    (setter, previewSetter = null) =>
    (e) => {
      const file = e.target.files[0];
      if (file) {
        setter(file);
        if (previewSetter) {
          previewSetter(URL.createObjectURL(file));
        }
      }
    };

  if (!userId) return <div>User not logged in.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <section>
      <form
        className="w-full px-4 py-5 mx-auto mt-5 border md:px-8"
        onSubmit={handleSaveBtn}
      >
        <div className="mb-4">
          <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
            Shop Name
            <Tooltip content="Enter the official name of your shop (max 50 characters)">
              <QuestionMarkCircleIcon
                className="w-4 h-4 ml-1 text-gray-300 cursor-pointer hover:text-gray-500"
                aria-hidden="true"
              />
            </Tooltip>
          </label>
          {editForm ? (
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              maxLength={50}
            />
          ) : (
            <span className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm cursor-not-allowed rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5">
              {shopName}
            </span>
          )}
        </div>

        <div className="flex items-end gap-5 mb-5">
          {profilePreview && (
            <div className="w-full max-w-96 h-96">
              <img
                src={profilePreview}
                alt="Logo Preview"
                className="object-cover w-full h-full border rounded-lg"
              />
            </div>
          )}
          <div className="flex-1">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              Upload Logo
              <Tooltip content="Accepted formats: JPG, JPEG, or PNG only">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
            <input
              type="file"
              onChange={handleFileChange(setProfile, setProfilePreview)}
              className={`block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen ${
                editForm ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!editForm}
              accept=".jpg, .jpeg, .png"
            />
          </div>
        </div>

        <section className="flex gap-5 mb-5">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
                Business Permit
                <Tooltip content="Upload your Mayor's or Business Permit (PDF only)">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </label>
              <a
                href={businessPermit}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View File
              </a>
            </div>
            <input
              type="file"
              onChange={handleFileChange(setBusinessPermit)}
              className={`block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen ${
                editForm ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!editForm}
              accept=".pdf"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
                Valid ID
                <Tooltip content="Upload a valid ID of the business owner (PDF only)">
                  <QuestionMarkCircleIcon
                    className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Tooltip>
              </label>
              <a
                href={validId}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 underline"
              >
                View File
              </a>
            </div>
            <input
              type="file"
              onChange={handleFileChange(setValidId)}
              className={`block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen ${
                editForm ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!editForm}
              accept=".pdf"
            />
          </div>
        </section>

        {/* Address Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Region Dropdown */}
          <div className="flex-1">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              Region
              <Tooltip content="Enter your Region">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
            {editForm ? (
              <select
                value={selectedRegion}
                onChange={handleRegionChange}
                className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              >
                <option value="">Select Region</option>
                {regionOptions.map((region) => (
                  <option key={region.region_code} value={region.region_code}>
                    {region.region_name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="bg-gray-50 border cursor-not-allowed pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5">
                {/* {selectedRegionName} */}
                {selectedRegion}
              </span>
            )}
          </div>

          {/* Province Dropdown */}
          <div className="flex-1">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              Province
              <Tooltip content="Enter your Province">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
            {editForm ? (
              <select
                value={selectedProvince}
                onChange={handleProvinceChange}
                disabled={!selectedRegion}
                className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              >
                <option value="">Select Province</option>
                {provinceOptions.map((province) => (
                  <option
                    key={province.province_code}
                    value={province.province_code}
                  >
                    {province.province_name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="bg-gray-50 border cursor-not-allowed pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5">
                {/* {selectedProvinceName} */}
                {selectedProvince}
              </span>
            )}
          </div>

          {/* City Dropdown */}
          <div className="flex-1">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              City/Municipal
              <Tooltip content="Enter your City or Municipal">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
            {editForm ? (
              <select
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedProvince}
                className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              >
                <option value="">Select City/Municipal</option>
                {cityOptions.map((city) => (
                  <option key={city.city_code} value={city.city_code}>
                    {city.city_name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="bg-gray-50 border cursor-not-allowed pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5">
                {/* {selectedCityName} */}
                {selectedCity}
              </span>
            )}
          </div>

          {/* Barangay Dropdown */}
          <div className="flex-1">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              Barangay
              <Tooltip content="Enter your Barangay">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
            {editForm ? (
              <select
                value={selectedBarangay}
                onChange={handleBarangayChange}
                disabled={!selectedCity}
                className="bg-gray-50 cursor-pointer border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              >
                <option value="">Select Barangay</option>
                {barangayOptions.map((barangay) => (
                  <option key={barangay.brgy_code} value={barangay.brgy_code}>
                    {barangay.brgy_name}
                  </option>
                ))}
              </select>
            ) : (
              <span className="bg-gray-50 border cursor-not-allowed pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5">
                {/* {selectedBarangayName} */}
                {selectedBarangay}
              </span>
            )}
          </div>

          {/* Street Number */}
          <div className="flex-1">
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              Street Number
              <Tooltip content="Enter your Street Number">
                <QuestionMarkCircleIcon
                  className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                  aria-hidden="true"
                />
              </Tooltip>
            </label>
            <input
              type="text"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Enter street number"
              className={`bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
                editForm ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!editForm}
            />
          </div>
        </div>

        {/* Edit, Save, and Cancel Buttons */}
        {editForm ? (
          <div className="flex gap-3 mt-4 w-fit">
            <button
              type="submit"
              className="text-white bg-arfagreen font-medium rounded-md text-sm w-full sm:w-auto px-7 py-2.5 text-center"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleCancelBtn}
              className="border text-black border-gray-400 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setEditForm(true)}
            className="text-white bg-arfagreen font-medium rounded-md text-sm w-full sm:w-auto px-7 py-2.5 text-center mt-4"
          >
            Edit
          </button>
        )}
      </form>
    </section>
  );
};

export default SellerUserProfile;
