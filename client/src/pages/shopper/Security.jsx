import React, { useEffect, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import {
  QuestionMarkCircleIcon,
  EyeSlashIcon,
  EyeIcon,
  XMarkIcon,
  CheckIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import toast, { Toaster } from "react-hot-toast";
import { doPasswordChange, doPasswordReset } from "../../firebase/auth";
import { getAuth } from "firebase/auth";

const Security = () => {
  const [email, setEmail] = useState(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      toast.error("No user is currently logged in.");
      return;
    }

    // Find the third-party provider if user signed in via Google or Facebook
    const thirdPartyProvider = user.providerData.find(
      (provider) =>
        provider.providerId === "google.com" ||
        provider.providerId === "facebook.com"
    );

    if (thirdPartyProvider) {
      // User signed in via Google or Facebook, send a password reset email
      const result = await doPasswordReset(
        user.email,
        thirdPartyProvider.providerId
      );
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } else if (user.providerData[0].providerId === "password") {
      // Regular email/password user
      const result = await doPasswordChange(
        currentPassword.trim(),
        newPassword.trim()
      );
      if (result.success) {
        toast.success("Password change successful!");
      } else if (result.errorCode === "auth/wrong-password") {
        toast.error(
          "The current password you entered is incorrect. Please try again."
        );
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("Password change is not supported for your account type.");
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email);
    } else {
      console.log("No user is currently logged in.");
    }
  }, []);
  return (
    <>
      <Toaster />
      <section className="flex justify-center">
        <section className="px-4 md:px-8" style={{ width: "min(700px, 90%)" }}>
          <div className="p-3 rounded-full w-fit bg-arfagray">
            <LockClosedIcon className="w-5 h-5 text-arfagreen" />
          </div>
          <header className="mt-5 mb-4">
            <div className="font-medium text-gray-900">Change Password</div>
            <p className="text-sm text-gray-600">
              To change your password, please fill in the fields below. Your
              password must contain at least 8 characters, including one
              uppercase letter, one lowercase letter, one number, and one
              special character.
            </p>
          </header>
          <div className="flex flex-wrap gap-2">
            <div className="text-sm font-medium text-gray-900">
              Registered Email:
            </div>
            <p className="text-sm text-gray-600">{email || ""}</p>
          </div>
          <main>
            <form
              onSubmit={handlePasswordChange}
              className="flex flex-col gap-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="current-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Current Password
                  </label>
                  <Tooltip content="Enter your current password.">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <div className="relative">
                  <input
                    type={!showCurrentPassword ? "password" : "text"}
                    id="current-password"
                    className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute inset-y-0 flex items-center cursor-pointer right-2"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {!showCurrentPassword ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="new-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    New Password
                  </label>
                  <Tooltip content="Password format: At least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <div className="relative">
                  <input
                    type={!showNewPassword ? "password" : "text"}
                    id="new-password"
                    className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute inset-y-0 flex items-center gap-2 cursor-pointer right-2"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {newPassword.length > 0 ? (
                      <>
                        {newPassword === confirmPassword ? (
                          <CheckIcon className="w-5 h-5 text-blue-500" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-red-500" />
                        )}
                        {!showNewPassword ? (
                          <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <Tooltip content="Re-enter your new password to confirm.">
                    <QuestionMarkCircleIcon
                      className="w-4 h-4 ml-auto mr-1 text-gray-300 cursor-pointer hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Tooltip>
                </div>
                <div className="relative">
                  <input
                    type={!showConfirmPassword ? "password" : "text"}
                    id="confirm-password"
                    className="bg-gray-50 border pr-10 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-arfagreen focus:border-arfagreen block w-full p-2.5"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <div
                    className="absolute inset-y-0 flex items-center gap-2 cursor-pointer right-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {confirmPassword.length > 0 ? (
                      <>
                        {newPassword === confirmPassword &&
                        newPassword &&
                        confirmPassword ? (
                          <CheckIcon className="w-5 h-5 text-blue-500" />
                        ) : (
                          <XMarkIcon className="w-5 h-5 text-red-500" />
                        )}
                        {!showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="w-5 h-5 text-gray-400" />
                        )}
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3">
                <button
                  type="submit"
                  className="text-white bg-arfagreen font-medium rounded-md text-sm px-7 py-2.5 text-center"
                >
                  Change Password
                </button>
                <p className="text-sm text-blue-600 underline cursor-pointer hover:text-blue-800">
                  Forgot Password?
                </p>
              </div>
            </form>
          </main>
        </section>
      </section>
    </>
  );
};

export default Security;
