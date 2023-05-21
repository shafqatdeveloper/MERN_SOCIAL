import React, { useState } from "react";
import Signup from "../Components/Signup.jsx";
import Login from "../Components/Login.jsx";

const LoginSignup = () => {
  const [login, setLogin] = useState(true);
  const handlelginSignup = () => {
    setLogin(!login);
  };
  return (
    <div className="w-full h-screen   py-5 flex flex-col items-center justify-center">
      <div className="w-[80%] relative sm-w-3/5 md:w-[28%] bg-white rounded-md">
        {login ? <Login /> : <Signup />}
        <h1
          className="absolute bottom-4 text-gray-500 cursor-pointer right-3"
          onClick={handlelginSignup}
        >
          {login
            ? "Don't Have an Account? Signup"
            : "Already Have an Account? Login"}
        </h1>
      </div>
    </div>
  );
};

export default LoginSignup;
