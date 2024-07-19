import React from "react";

const LoginShopper = () => {
  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" />
      </div>
      <div>
        <label htmlFor="username">Password</label>
        <input type="text" />
      </div>
      <button className="px-3 py-2 text-white bg-arfagreen" onClick={login}>
        Login
      </button>
    </div>
  );
};

export default LoginShopper;
