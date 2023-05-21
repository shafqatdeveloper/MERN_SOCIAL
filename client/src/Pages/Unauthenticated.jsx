import React, { useState } from "react";
import UnauthenticatedUserNavbar from "../Components/UnauthenticatedUserNavbar.jsx";
import LoginSignup from "./LoginSignup.jsx";

const Unauthenticated = () => {
  return (
    <div>
      <UnauthenticatedUserNavbar />
      <LoginSignup />
    </div>
  );
};

export default Unauthenticated;
