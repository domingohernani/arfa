import React, { useEffect, useState } from "react";
import gcash from "../../../assets/icons/gcash.png";
import paypal from "../../../assets/icons/paypal.png";
import { getShopInfo } from "../../../firebase/shop";
import { getAuth } from "firebase/auth";
import { updatePayout } from "../../../firebase/shop";
import toast from "react-hot-toast";

const SellerUserPayout = () => {
  const [payoutMethod, setPayoutMethod] = useState("");
  const [gcashNumber, setGcashNumber] = useState("");
  const [gcashName, setGcashName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [paypalName, setPaypalName] = useState("");

  const handlePayoutMethodChange = (e) => {
    setPayoutMethod(e.target.value);
    setGcashNumber("");
    setGcashName("");
    setPaypalEmail("");
    setPaypalName("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    const shopId = auth.currentUser.uid;

    const newPayoutDetails = {
      method: payoutMethod,
      gcashNumber: payoutMethod === "gcash" ? gcashNumber : "",
      gcashName: payoutMethod === "gcash" ? gcashName : "",
      paypalEmail: payoutMethod === "paypal" ? paypalEmail : "",
      paypalName: payoutMethod === "paypal" ? paypalName : "",
    };

    const success = await updatePayout(shopId, newPayoutDetails);
    if (success) {
      toast.success("Payout details updated successfully.");
    } else {
      toast.success("Failed to update payout details.");
    }
  };

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const auth = getAuth();
        const id = auth.currentUser.uid;
        const result = await getShopInfo(id);

        setPayoutMethod(result.payout.method);
        setGcashNumber(result.payout.gcashNumber);
        setGcashName(result.payout.gcashName);
        setPaypalEmail(result.payout.paypalEmail);
        setPaypalName(result.payout.paypalName);
      } catch (error) {
        console.log(error);
      }
    };
    fetchShop();
  }, []);

  return (
    <div className="mx-auto" style={{ width: "min(700px, 90%)" }}>
      <div className="font-medium text-gray-900">Select Payout Method</div>
      <p className="text-sm leading-relaxed text-gray-600">
        To set up your payout method, please select either GCash or PayPal and
        fill in the required details below. This information will be used to
        transfer funds to your selected account.
      </p>
      <ul className="mt-2 text-sm text-gray-600 list-disc list-inside">
        <li className="leading-relaxed">
          <b>Note:</b> The selected payout account will receive your monthly
          payments from Arfa. Please ensure that the account details are
          accurate to avoid any delays in receiving funds.
        </li>
      </ul>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payoutMethod"
              value="gcash"
              checked={payoutMethod === "gcash"}
              onChange={handlePayoutMethodChange}
              required
            />
            <img src={gcash} alt="GCash" className="object-contain w-6 h-6" />
            <span>GCash</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payoutMethod"
              value="paypal"
              checked={payoutMethod === "paypal"}
              onChange={handlePayoutMethodChange}
              required
            />
            <img src={paypal} alt="PayPal" className="w-6 h-6" />
            <span>PayPal</span>
          </label>
        </div>

        {/* Display large selected logo */}
        {payoutMethod && (
          <div className="flex justify-center my-4">
            <img
              src={payoutMethod === "gcash" ? gcash : paypal}
              alt={`${payoutMethod === "gcash" ? "GCash" : "PayPal"} Logo`}
              className="object-contain w-36 h-36"
            />
          </div>
        )}

        {payoutMethod === "gcash" && (
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              GCash Number:
            </label>
            <input
              type="text"
              value={gcashNumber}
              onChange={(e) => setGcashNumber(e.target.value)}
              placeholder="Enter your GCash number"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              required
              pattern="^\d{11}$"
              inputMode="numeric"
              maxLength="11"
              title="Please enter exactly 11 digits for your GCash number."
            />
            <label className="flex items-center gap-2 mt-3 mb-2 text-sm font-medium text-gray-900">
              Account Holder's Name:
            </label>
            <input
              type="text"
              value={gcashName}
              onChange={(e) => setGcashName(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              required
            />
          </div>
        )}

        {payoutMethod === "paypal" && (
          <div>
            <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-900">
              PayPal Email:
            </label>
            <input
              type="email"
              value={paypalEmail}
              onChange={(e) => setPaypalEmail(e.target.value)}
              placeholder="Enter your PayPal email"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              required
            />
            <label className="flex items-center gap-2 mt-3 mb-2 text-sm font-medium text-gray-900">
              Account Holder's Name:
            </label>
            <input
              type="text"
              value={paypalName}
              onChange={(e) => setPaypalName(e.target.value)}
              placeholder="Enter your name"
              className="bg-gray-50 border pr-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="text-white mt-4 bg-arfagreen font-medium rounded-md text-sm w-full sm:w-auto px-7 py-2.5 text-center"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SellerUserPayout;
