import React from "react";

const UserProfile = () => {
  return (
    <>
      <section className="px-4 md:px-8">
        <div className="">
          <div className="font-semibold">Profile Information</div>
          <div>
            Update your personal details to keep your profile up to date
          </div>
        </div>
        <form className="w-full max-w-md px-8 py-5 mx-auto mt-5 border">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_first_name"
                className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                First name
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_last_name"
                className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Last name
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_phone_number"
                id="floating_phone_number"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_phone_number"
                className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Phone Number
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="date"
                name="floating_date_of_birth"
                id="floating_date_of_birth"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_date_of_birth"
                className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Date of Birth
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="repeat_password"
              id="floating_repeat_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_repeat_password"
              className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Confirm password
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_street"
              id="floating_street"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_street"
              className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Street Address
            </label>
          </div>
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_city"
                id="floating_city"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_city"
                className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                City
              </label>
            </div>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="floating_state"
                id="floating_state"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
                placeholder=" "
                required
              />
              <label
                htmlFor="floating_state"
                className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                State/Province
              </label>
            </div>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="floating_postal_code"
              id="floating_postal_code"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-arfablack appearance-none dark:text-white dark:border-gray-600 dark:focus:border-arfagreen focus:outline-none focus:ring-0 focus:border-arfagreen peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_postal_code"
              className="peer-focus:font-medium focus:border-transparent peer-focus:text-arfagreen absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Postal Code
            </label>
          </div>
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
