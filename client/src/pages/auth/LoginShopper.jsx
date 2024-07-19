import React from "react";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";

const LoginShopper = () => {
  const login = () => {};

  return (
    <div>
      <form action="" onSubmit={login}>
        <div>
          <label htmlFor="email">Username</label>
          <input type="email" id="email" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" />
        </div>
        <input
          className="px-3 py-2 text-white bg-arfagreen"
          type="submit"
          value="Login"
        />
      </form>
    </div>
  );
};

export default LoginShopper;
