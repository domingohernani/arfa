import React, { useCallback, useEffect, useState } from "react";
import { getShopInfo } from "../../firebase/shop";
import { auth } from "../../firebase/firebase";
import {
  regions,
  provinces,
  cities,
  barangays,
} from "select-philippines-address";
import { Tooltip } from "flowbite-react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

const SellerSettings = () => {
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
  const [streetNumber, setStreetNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [editForm, setEditForm] = useState(false);

  // States for logo upload and preview
  const [profile, setProfile] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");

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
    setSelectedRegion(regionCode);
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
    setSelectedProvince(provinceCode);
    setSelectedCity("");
    setSelectedBarangay("");
    setCityOptions([]);
    setBarangayOptions([]);

    const citiesData = await cities(provinceCode);
    setCityOptions(citiesData);
  };

  const handleCityChange = async (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setSelectedBarangay("");
    setBarangayOptions([]);

    const barangaysData = await barangays(cityCode);
    setBarangayOptions(barangaysData);
  };

  const handleBarangayChange = (e) => {
    setSelectedBarangay(e.target.value);
  };

  const handleCancelBtn = () => {
    setEditForm(false);
    setProfile(null);
    setProfilePreview("");
    fetchShopInfo();
  };

  const handleSaveBtn = (e) => {
    e.preventDefault();
    // Implement save functionality if needed
    setEditForm(false);
  };

  // Handle logo upload and preview
  const handleFileChange = (setter, previewSetter) => (e) => {
    const file = e.target.files[0];
    if (file) {
      setter(file);
      previewSetter(URL.createObjectURL(file));
    }
  };

  if (!userId) return <div>User not logged in.</div>;
  if (loading) return <div>Loading...</div>;

  return (
    <section className="px-4 md:px-8">
      <div className="font-medium">Seller Profile</div>
      <form
        className="w-full px-4 py-5 mx-auto mt-5 border md:px-8"
        onSubmit={handleSaveBtn}
      >
        {/* Shop Name */}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Shop Name
          </label>
          {editForm ? (
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
            />
          ) : (
            <span className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm cursor-not-allowed rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5">
              {shopName}
            </span>
          )}
        </div>

        {/* Logo Upload */}

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
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Upload Logo
            </label>
            <input
              type="file"
              onChange={handleFileChange(setProfile, setProfilePreview)}
              className={`block w-full pr-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-arfagreen focus:border-arfagreen ${
                editForm ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              disabled={!editForm}
              accept="image/*"
            />
          </div>
        </div>

        <section className="flex gap-5 mb-5">
          {/* Business Permit */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Business Permit
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
              accept="image/*"
            />
          </div>

          {/* Valid ID */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <label className="block mb-2 text-sm font-medium text-gray-900">
                Valid ID
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
              accept="image/*"
            />
          </div>
        </section>

        {/* Address Fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Region Dropdown */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Region
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
                {selectedRegion}
              </span>
            )}
          </div>

          {/* Province Dropdown */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Province
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
                {selectedProvince}
              </span>
            )}
          </div>

          {/* City Dropdown */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              City/Municipal
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
                {selectedCity}
              </span>
            )}
          </div>

          {/* Barangay Dropdown */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Barangay
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
                {selectedBarangay}
              </span>
            )}
          </div>

          {/* Street Number */}
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Street Number
            </label>
            <input
              type="text"
              value={streetNumber}
              onChange={(e) => setStreetNumber(e.target.value)}
              placeholder="Enter street number"
              className={`bg-gray-50 border  pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5 ${
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

export default SellerSettings;
